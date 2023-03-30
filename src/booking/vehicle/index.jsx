import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faFilter,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import {
    closeModalFilter,
    getFacilities,
    getFilters,
    openModalFilter,
} from '../action';
import { connect } from 'react-redux';
import FilterModal from '../../common/components/filterModal';
import BookingFacilityList from '../../common/components/bookingFacilityList';
import LoadingScreen from '../../common/components/loadingScreen';
import { withRouter } from '../../common/withRouter';

class BookingVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: null,
            currentPage: 1,
            maxPage: 1,
            q: '',
            filters: null,
            appliedFilters: [],
        };
    }
    componentDidMount() {
        this.props.getFacilitiesFunction(
            'vehicles',
            this.state.currentPage,
            9,
            '',
            this.convertToFilterString(this.state.appliedFilters),
        );
        this.props.getFiltersFunction();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.facilities !== this.props.facilities) {
            this.setState({
                facilities: this.props.facilities,
                maxPage: Math.ceil(this.props.facilities.total_rows / 9),
            });
        }
        if (
            prevState.currentPage !== this.state.currentPage &&
            prevState.q === this.state.q
        ) {
            this.setState({
                facilities: null,
            });
            this.props.getFacilitiesFunction(
                'vehicles',
                this.state.currentPage,
                9,
                this.state.q,
                this.convertToFilterString(this.state.appliedFilters),
            );
        }
        if (prevProps.filters !== this.props.filters) {
            this.setState({
                filters: [
                    {
                        id: 0,
                        name: 'campus_list',
                        display: 'Kampus',
                        options: this.props.filters.campus_list,
                    },
                    {
                        id: 1,
                        name: 'vehicle_type',
                        display: 'Jenis',
                        options: this.props.filters.vehicle_type,
                    },
                    {
                        id: 2,
                        name: 'sim_category',
                        display: 'SIM',
                        options: this.props.filters.sim_category,
                    },
                ],
            });
        }
    }

    handleFilterOption = (filters) => {
        let filterString = this.convertToFilterString(filters);
        this.setState({
            facilities: null,
            appliedFilters: filters,
            currentPage: 1,
        });
        this.props.getFacilitiesFunction(
            'vehicles',
            1,
            9,
            this.state.q,
            filterString,
        );
    };

    convertToFilterString = (filters) => {
        if (filters.length === 0) {
            return 'status_maintenance=false';
        }
        let filterString = 'status_maintenance=false';
        for (let i = 0; i < filters.length; i++) {
            if (filters[i]) {
                if (filterString !== '') {
                    filterString += '&';
                }
                filterString += this.state.filters[i].name + '=' + filters[i];
            }
        }
        filterString = filterString.replace('campus_list', 'campus_id');
        filterString = filterString.replace('vehicle_type', 'type');
        return filterString;
    };

    handleSearch = (event) => {
        this.setState({
            q: event.target.value,
            currentPage: 1,
        });
        this.props.getFacilitiesFunction(
            'vehicles',
            1,
            9,
            event.target.value,
            this.convertToFilterString(this.state.appliedFilters),
        );
    };

    renderPaginationNumbers = () => {
        let paginationNumbers = [];
        for (let i = 1; i <= this.state.maxPage; i++) {
            paginationNumbers.push(i);
        }
        return paginationNumbers.map((number) => {
            return (
                <Pagination.Item
                    key={number}
                    active={number === this.state.currentPage}
                    onClick={() => this.setState({ currentPage: number })}
                >
                    {number}
                </Pagination.Item>
            );
        });
    };

    handleFacilityClicked = (id) => {
        this.props.navigate(`/booking/vehicle/${id}`);
    };

    render() {
        if (this.state.facilities === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-booking-facility">
                <div className="container-booking-facility__header">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="icon-booking-facility"
                    />
                    <h1>Peminjaman Kendaraan</h1>
                </div>
                <div className="container-booking-facility__body">
                    <div className="search__bar">
                        <div className="search__box">
                            <input
                                className="search__box__input"
                                type="text"
                                name="bookingSearch"
                                placeholder="Pencarian"
                                value={this.state.q}
                                onChange={this.handleSearch}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div className="filter__items">
                            {this.state.appliedFilters &&
                                this.state.appliedFilters.map(
                                    (appliedFilters, index) => {
                                        return (
                                            appliedFilters && (
                                                <button
                                                    className="filter-item-label"
                                                    key={appliedFilters}
                                                    onClick={() => {
                                                        let newFilters =
                                                            this.state
                                                                .appliedFilters;
                                                        delete newFilters[
                                                            index
                                                        ];
                                                        this.handleFilterOption(
                                                            newFilters,
                                                        );
                                                    }}
                                                >
                                                    {
                                                        this.state.filters[
                                                            index
                                                        ].display
                                                    }{' '}
                                                    :{' '}
                                                    {
                                                        this.state.filters[
                                                            index
                                                        ].options.find(
                                                            (obj) =>
                                                                obj.id ===
                                                                appliedFilters,
                                                        ).name
                                                    }{' '}
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                    />
                                                </button>
                                            )
                                        );
                                    },
                                )}
                            <FontAwesomeIcon
                                icon={faFilter}
                                onClick={() => this.props.openModalFunction()}
                                className="icon-filter-item"
                            />
                        </div>
                    </div>
                    <div className="container-booking-facility__body__item">
                        <BookingFacilityList
                            facilities={this.state.facilities.rows}
                            type="vehicles"
                            handleFacilityClicked={this.handleFacilityClicked}
                        />
                    </div>
                    <FilterModal
                        filterlist={this.state.filters}
                        filters={this.state.appliedFilters}
                        filtersubmitfunction={this.handleFilterOption}
                    />
                </div>
                <Pagination>
                    <Pagination.First
                        onClick={() => this.setState({ currentPage: 1 })}
                    />
                    <Pagination.Prev
                        onClick={() =>
                            this.setState({
                                currentPage:
                                    this.state.currentPage <= 1
                                        ? 1
                                        : this.state.currentPage - 1,
                            })
                        }
                    />
                    {this.renderPaginationNumbers()}
                    <Pagination.Next
                        onClick={() =>
                            this.setState({
                                currentPage:
                                    this.state.currentPage >= this.state.maxPage
                                        ? this.state.maxPage
                                        : this.state.currentPage + 1,
                            })
                        }
                    />
                    <Pagination.Last
                        onClick={() =>
                            this.setState({ currentPage: this.state.maxPage })
                        }
                    />
                </Pagination>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        filterModalOpen: state.facility.filterModalOpen,
        facilities: state.facility.facilities,
        filters: state.facility.filters,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
        getFacilitiesFunction: (type, page, limit, query, filters) =>
            dispatch(getFacilities(type, page, limit, query, filters)),
        getFiltersFunction: () => dispatch(getFilters()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingVehicle),
);
