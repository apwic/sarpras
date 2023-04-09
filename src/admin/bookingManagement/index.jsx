import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch,
    faFilter,
    faBookOpen,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from '../../common/withRouter';
import LoadingScreen from '../../common/components/loadingScreen';
import BookingManagementList from '../../common/components/bookingManagamentList';
import { Pagination } from 'react-bootstrap';
import { closeModalFilter, getBookingList, openModalFilter } from './action';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';
import facilityTypeConstant from '../../common/constants/facilityTypeConstant';
import FilterModal from '../../common/components/filterModal';

class BookingManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: null,
            currentPage: 1,
            maxPage: 1,
            query: '',
            filters: [
                {
                    id: 0,
                    name: 'status_list',
                    display: 'Status',
                    options: Object.values(bookingStatusConstant).map(
                        (status) => ({
                            id: status.name,
                            name: status.value,
                        }),
                    ),
                },
                {
                    id: 1,
                    name: 'category_list',
                    display: 'Kategori',
                    options: Object.values(facilityTypeConstant).map(
                        (type) => ({
                            id: type.name,
                            name: type.value,
                        }),
                    ),
                },
            ],
            appliedFilters: [],
        };
    }

    componentDidMount() {
        this.props.getBookingListFunction(
            this.state.query,
            this.state.currentPage,
            5,
            this.convertToFilterString(this.state.appliedFilters),
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bookingList !== this.props.bookingList) {
            this.setState({
                bookingList: this.props.bookingList,
                maxPage:
                    this.props.bookingList.total_rows > 0
                        ? Math.ceil(this.props.bookingList.total_rows / 5)
                        : 1,
            });
        }
        if (
            prevState.currentPage !== this.state.currentPage &&
            prevState.query === this.state.query
        ) {
            this.setState({
                bookingList: null,
            });
            this.props.getBookingListFunction(
                this.state.query,
                this.state.currentPage,
                5,
                this.convertToFilterString(this.state.appliedFilters),
            );
        }
    }
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
        filterString = filterString.replace('status_list', 'status');
        filterString = filterString.replace('category_list', 'category');
        return filterString;
    };

    handleFilterOption = (filters) => {
        let filterString = this.convertToFilterString(filters);
        this.setState({
            bookingList: null,
            appliedFilters: filters,
            currentPage: 1,
        });
        this.props.getBookingListFunction(
            this.state.query,
            this.state.currentPage,
            5,
            filterString,
        );
    };

    handleSearch = (event) => {
        this.setState({
            query: event.target.value,
            currentPage: 1,
        });
        this.props.getBookingListFunction(
            event.target.value,
            this.state.currentPage,
            5,
            this.convertToFilterString(this.state.appliedFilters),
        );
    };

    handleBookingManagementClicked = (id) => {
        this.props.navigate(`/manage/booking/${id}`);
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
        if (this.state.bookingList === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-bookingManagement">
                <div className="container-bookingManagement__header">
                    <FontAwesomeIcon
                        icon={faBookOpen}
                        className="icon-bookingManagement"
                    />
                    <h1>Manajemen Peminjaman</h1>
                </div>
                <div className="container-bookingManagement__body">
                    <div className="container-bookingManagement__body__tools">
                        <div className="search__box">
                            <input
                                className="search__box__input"
                                type="text"
                                name="bookingSearch"
                                placeholder="Pencarian"
                                value={this.state.query}
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
                    <div className="container-bookingManagement__body__items">
                        <BookingManagementList
                            bookingList={this.state.bookingList}
                            handleBookingManagementClicked={
                                this.handleBookingManagementClicked
                            }
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
        bookingList: state.bookingManagement.bookingList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingListFunction: (query, page, limit, filters) =>
            dispatch(getBookingList(query, page, limit, filters)),
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingManagement),
);
