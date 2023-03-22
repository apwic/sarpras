import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import {
    closeModalFilter,
    getFacilities,
    openModalFilter,
} from '../../booking/action';
import { connect } from 'react-redux';
import FilterModal from '../../common/components/filterModal';
import AdminFacilityList from '../../common/components/adminFacilityList';
import LoadingScreen from '../../common/components/loadingScreen';

class ManageVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: null,
            currentPage: 1,
            maxPage: 1,
            q: '',
        };
    }
    componentDidMount() {
        this.props.getFacilitiesFunction(
            'vehicles',
            this.state.currentPage,
            9,
            this.state.q,
            '',
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.facilities !== this.props.facilities) {
            this.setState({
                facilities: this.props.facilities,
                maxPage: Math.ceil(this.props.facilities.total_rows / 9),
            });
        }
        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({
                facilities: null,
            });
            this.props.getFacilitiesFunction(
                'vehicles',
                this.state.currentPage,
                9,
                this.state.q,
                '',
            );
        }
    }

    handleFilterOption = (option) => {
        option.forEach((optionFilter) => {
            if (optionFilter === 1) {
                console.log('PRICE');
            } else if (optionFilter === 2) {
                console.log('CAPACITY');
            } else if (optionFilter === 3) {
                console.log('PLATE NUMBER');
            }
        });
    };

    handleSearch = (event) => {
        this.setState({
            q: event.target.value,
        });
        this.props.getFacilitiesFunction('vehicles', 1, 9, event.target.value);
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
                                onChange={this.handleSearch}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div className="filter__items">
                            <FontAwesomeIcon
                                icon={faFilter}
                                onClick={() => this.props.openModalFunction()}
                                className="icon-filter-item"
                            />
                        </div>
                        <button className="btn btn-primary btn-add">
                            + Tambah Kendaraan
                        </button>
                    </div>
                    <div className="container-booking-facility__body__item">
                        <AdminFacilityList
                            facilities={this.state.facilities.rows}
                            type="vehicles"
                        />
                    </div>
                    <FilterModal handleFilterOption={this.handleFilterOption} />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
        getFacilitiesFunction: (type, page, limit, query) =>
            dispatch(getFacilities(type, page, limit, query)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVehicle);
