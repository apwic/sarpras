import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSearch,
    faTimes,
    faFilter,
    faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from '../common/withRouter';
import LoadingScreen from '../common/components/loadingScreen';
import BookingManagementList from '../common/components/bookingManagamentList';
// import FilterModal from '../common/components/filterModal';

class BookingManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookings: {
                rows: [
                    {
                        attachment: [
                            'https://storage.googleapis.com/sarpras/document/bo…g-48/cbb0fd0ba7d111b126f74526678f30d094c3cb5e.pdf',
                        ],
                        category: 'BUILDING',
                        cost: 1000,
                        createdAt: '2023-03-30T11:46:18.572Z',
                        description: 'Ngabuburit',
                        end_timestamp: '2023-04-05T13:00:00.000Z',
                        facility: {
                            id: 74,
                            name: 'Gedung Sate',
                            description: 'Bukan gedung ITB',
                        },
                        facility_id: 74,
                        id: 48,
                        letter: null,
                        payment_id: null,
                        rekening_va: null,
                        start_timestamp: '2023-04-05T10:00:00.000Z',
                        status: 'PENDING',
                        updatedAt: '2023-03-30T11:46:18.915Z',
                        url: '23232323',
                        user_id: 1,
                        verifier_id: null,
                    },
                    {
                        attachment: [
                            'https://storage.googleapis.com/sarpras/document/bo…g-48/cbb0fd0ba7d111b126f74526678f30d094c3cb5e.pdf',
                        ],
                        category: 'BUILDING',
                        cost: 1000,
                        createdAt: '2023-03-30T11:46:18.572Z',
                        description: 'Ngabuburit',
                        end_timestamp: '2023-04-05T13:00:00.000Z',
                        facility: {
                            id: 74,
                            name: 'Gedung Sate',
                            description: 'Bukan gedung ITB',
                        },
                        facility_id: 74,
                        id: 48,
                        letter: null,
                        payment_id: null,
                        rekening_va: null,
                        start_timestamp: '2023-04-05T10:00:00.000Z',
                        status: 'PENDING',
                        updatedAt: '2023-03-30T11:46:18.915Z',
                        url: '23232323',
                        user_id: 1,
                        verifier_id: null,
                    },
                    {
                        attachment: [
                            'https://storage.googleapis.com/sarpras/document/bo…g-48/cbb0fd0ba7d111b126f74526678f30d094c3cb5e.pdf',
                        ],
                        category: 'BUILDING',
                        cost: 1000,
                        createdAt: '2023-03-30T11:46:18.572Z',
                        description: 'Ngabuburit',
                        end_timestamp: '2023-04-05T13:00:00.000Z',
                        facility: {
                            id: 74,
                            name: 'Gedung Sate',
                            description: 'Bukan gedung ITB',
                        },
                        facility_id: 74,
                        id: 48,
                        letter: null,
                        payment_id: null,
                        rekening_va: null,
                        start_timestamp: '2023-04-05T10:00:00.000Z',
                        status: 'PENDING',
                        updatedAt: '2023-03-30T11:46:18.915Z',
                        url: '23232323',
                        user_id: 1,
                        verifier_id: null,
                    },
                    {
                        attachment: [
                            'https://storage.googleapis.com/sarpras/document/bo…g-48/cbb0fd0ba7d111b126f74526678f30d094c3cb5e.pdf',
                        ],
                        category: 'BUILDING',
                        cost: 1000,
                        createdAt: '2023-03-30T11:46:18.572Z',
                        description: 'Ngabuburit',
                        end_timestamp: '2023-04-05T13:00:00.000Z',
                        facility: {
                            id: 74,
                            name: 'Gedung Sate',
                            description: 'Bukan gedung ITB',
                        },
                        facility_id: 74,
                        id: 48,
                        letter: null,
                        payment_id: null,
                        rekening_va: null,
                        start_timestamp: '2023-04-05T10:00:00.000Z',
                        status: 'PENDING',
                        updatedAt: '2023-03-30T11:46:18.915Z',
                        url: '23232323',
                        user_id: 1,
                        verifier_id: null,
                    },
                ],
                total_rows: 4,
            },
            currentPage: 1,
            maxPage: 1,
            query: '',
            filters: '',
            appliedFilters: [],
        };
    }

    componentDidMount() {
        // this.props.getMyBookingsFunction(
        //     this.state.currentPage,
        //     5,
        //     this.state.query,
        //     this.state.filters,
        // );
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.myBookings !== this.props.myBookings) {
        //     this.setState({
        //         myBookings: this.props.myBookings,
        //         maxPage: Math.ceil(this.props.myBookings.total_rows / 5),
        //     });
        // }
        // if (
        //     prevState.currentPage !== this.state.currentPage &&
        //     prevState.query === this.state.query
        // ) {
        //     this.setState({
        //         myBookings: null,
        //     });
        //     this.props.getMyBookingsFunction(
        //         this.state.currentPage,
        //         5,
        //         this.state.query,
        //         this.state.filters,
        //     );
        // }
        // if (prevState.filters !== this.state.filters) {
        //     this.setState({
        //         filters: [
        //             {
        //                 id: 0,
        //                 name: 'status_list',
        //                 display: 'Status',
        //                 options: this.props.filters.status_list,
        //             },
        //         ],
        //     });
        // }
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
        // if (this.state.myBookings === null) {
        //     return <LoadingScreen />;
        // }
        return (
            <div className="container-mybooking">
                <div className="container-mybooking__header">
                    <FontAwesomeIcon
                        icon={faBookOpen}
                        className="icon-mybooking"
                    />
                    <h1>Manajemen Peminjaman</h1>
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
                            {/* {this.state.appliedFilters &&
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
                                )} */}
                            <FontAwesomeIcon
                                icon={faFilter}
                                onClick={() => this.props.openModalFunction()}
                                className="icon-filter-item"
                            />
                            {/* <FilterModal
                                filterlist={this.state.filters}
                                filters={this.state.appliedFilters}
                                filtersubmitfunction={this.handleFilterOption}
                            /> */}
                        </div>
                    </div>
                    <div className="container-mybooking__body__items">
                        <BookingManagementList
                            myBookings={this.state.myBookings}
                            handleMyBookingClicked={this.handleMyBookingClicked}
                        />
                    </div>
                </div>
                {/* <Pagination>
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
                </Pagination> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingManagement),
);
