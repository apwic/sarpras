import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDoorOpen,
    faFilter,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import {
    closeModalFilter,
    deleteFacility,
    getFacilities,
    getFilters,
    openModalFilter,
} from '../../booking/action';
import { connect } from 'react-redux';
import FilterModal from '../../common/components/filterModal';
import AdminFacilityList from '../../common/components/adminFacilityList';
import LoadingScreen from '../../common/components/loadingScreen';
import { withRouter } from '../../common/withRouter';
import AlertModal from '../../common/components/alertModal';
import AlertDeleteModal from '../../common/components/alertDeleteModal';

class ManageRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: null,
            currentPage: 1,
            maxPage: 1,
            q: '',
            filters: null,
            appliedFilters: [],
            showAlertDelete: false,
            showAlert: false,
            facilityToDelete: null,
            alertDeleteMessage:
                'Apakah anda yakin ingin menghapus fasilitas ini?',
            alertMessage: '',
        };
    }
    componentDidMount() {
        this.props.getFacilitiesFunction(
            'rooms',
            1,
            9,
            this.state.q,
            this.convertToFilterString(this.state.appliedFilters),
        );
        this.props.getFiltersFunction();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.deleteMessage !== this.props.deleteMessage) {
            if (this.props.deleteMessage.error_message) {
                this.setState({
                    showAlert: true,
                    alertMessage: this.props.deleteMessage.error_message,
                });
            }
        }
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
                'rooms',
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
                        name: 'building_list',
                        display: 'Gedung',
                        options: this.props.filters.building_list,
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
            'rooms',
            1,
            9,
            this.state.q,
            filterString,
        );
    };

    convertToFilterString = (filters) => {
        if (filters.length === 0) {
            return '';
        }
        let filterString = '';
        for (let i = 0; i < filters.length; i++) {
            if (filters[i]) {
                if (filterString !== '') {
                    filterString += '&';
                }
                filterString += this.state.filters[i].name + '=' + filters[i];
            }
        }
        filterString = filterString.replace(
            'building_list',
            'facility_building_id',
        );
        return filterString;
    };

    handleSearch = (event) => {
        this.setState({
            q: event.target.value,
        });
        this.props.getFacilitiesFunction(
            'rooms',
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

    handleDeleteClicked = (id) => {
        this.setState({
            showAlertDelete: true,
            facilityToDelete: id,
        });
    };

    handleDeleteFacility = (id) => {
        this.props.deleteFacilityFunction(
            'room',
            id,
            this.state.currentPage,
            this.state.q,
            this.convertToFilterString(this.state.appliedFilters),
        );
        this.setState({
            facilities: null,
            showAlertDelete: false,
            facilityToDelete: null,
        });
    };

    closeAlertModal = () => {
        this.setState({
            showAlert: false,
        });
    };

    closeDeleteAlertModal = () => {
        this.setState({
            showAlertDelete: false,
        });
    };

    render() {
        if (this.state.facilities === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-booking-facility">
                <AlertModal
                    show={this.state.showAlert}
                    message={this.state.alertMessage}
                    closeModalFunction={this.closeAlertModal}
                />
                <AlertDeleteModal
                    show={this.state.showAlertDelete}
                    message={this.state.alertDeleteMessage}
                    closeAlertFunction={this.closeDeleteAlertModal}
                    handleCancelAlert={this.closeDeleteAlertModal}
                    handleYesAlert={this.handleDeleteFacility}
                />
                <div className="container-booking-facility__header">
                    <FontAwesomeIcon
                        icon={faDoorOpen}
                        className="icon-booking-facility"
                    />
                    <h1>Manajemen Ruangan</h1>
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
                        <button
                            className="btn btn-primary btn-add"
                            onClick={() =>
                                this.props.navigate('/admin/insert/room')
                            }
                        >
                            + Tambah Ruangan
                        </button>
                    </div>
                    <div className="container-booking-facility__body__item">
                        <AdminFacilityList
                            facilities={this.state.facilities.rows}
                            type="rooms"
                            handledelete={this.handleDeleteClicked}
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
        deleteMessage: state.facility.delete_message,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
        getFacilitiesFunction: (type, page, limit, query, filters) =>
            dispatch(getFacilities(type, page, limit, query, filters)),
        deleteFacilityFunction: (type, id, page, query, filters) =>
            dispatch(deleteFacility(type, id, page, query, filters)),
        getFiltersFunction: () => dispatch(getFilters()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ManageRoom),
);
