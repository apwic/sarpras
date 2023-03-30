import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSearch,
    faTimes,
    faFilter,
} from '@fortawesome/free-solid-svg-icons';
import MyBookingList from '../common/components/myBookingList';
import { connect } from 'react-redux';
import { getMyBookings, openModalFilter, closeModalFilter } from './action';
import { withRouter } from '../common/withRouter';
import LoadingScreen from '../common/components/loadingScreen';
import FilterModal from '../common/components/filterModal';
import { Pagination } from 'react-bootstrap';

class MyBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookings: null,
            currentPage: 1,
            maxPage: 1,
            query: '',
            filters: '',
            appliedFilters: [],
        };
    }

    componentDidMount() {
        this.props.getMyBookingsFunction(
            this.state.currentPage,
            5,
            this.state.query,
            this.state.filters,
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myBookings !== this.props.myBookings) {
            this.setState({
                myBookings: this.props.myBookings,
                maxPage: Math.ceil(this.props.myBookings.total_rows / 5),
            });
        }
        if (
            prevState.currentPage !== this.state.currentPage &&
            prevState.query === this.state.query
        ) {
            this.setState({
                myBookings: null,
            });
            this.props.getMyBookingsFunction(
                this.state.currentPage,
                5,
                this.state.query,
                this.state.filters,
            );
        }
        if (prevState.filters !== this.state.filters) {
            this.setState({
                filters: [
                    {
                        id: 0,
                        name: 'status_list',
                        display: 'Status',
                        options: this.props.filters.status_list,
                    },
                ],
            });
        }
    }

    handleFilterOption = (filters) => {
        let filterString = this.convertToFilterString(filters);
        this.setState({
            filters: filterString,
            appliedFilters: filters,
            currentPage: 1,
        });
        this.props.getMyBookingsFunction(
            this.state.currentPage,
            5,
            this.state.query,
            filterString,
        );
    };

    handleSearch = (event) => {
        this.setState({
            query: event.target.value,
            currentPage: 1,
        });
        this.props.getMyBookingsFunction(
            this.state.currentPage,
            5,
            event.target.value,
            this.state.filters,
        );
    };

    handleMyBookingClicked = (id) => {
        this.props.navigate(`/booking/${id}`);
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
        if (this.state.myBookings === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-mybooking">
                <div className="container-mybooking__header">
                    <FontAwesomeIcon icon={faUser} className="icon-mybooking" />
                    <h1>Peminjaman Saya</h1>
                </div>
                <div className="container-mybooking__body">
                    <div className="container-mybooking__body__tools">
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
                            <FilterModal
                                filterlist={this.state.filters}
                                filters={this.state.appliedFilters}
                                filtersubmitfunction={this.handleFilterOption}
                            />
                        </div>
                    </div>
                    <div className="container-mybooking__body__items">
                        <MyBookingList
                            myBookings={this.state.myBookings}
                            handleMyBookingClicked={this.handleMyBookingClicked}
                        />
                    </div>
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
        myBookings: state.myBooking.myBookings,
        filterModalOpen: state.myBooking.filterModalOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
        getMyBookingsFunction: (page, limit, query, filters) =>
            dispatch(getMyBookings(page, limit, query, filters)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyBooking),
);
