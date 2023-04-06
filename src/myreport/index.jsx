import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faFlag,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import FilterModal from '../common/components/filterModal';
import reportStatusConstant from '../common/constants/reportStatusConstant';
import reportTypeConstant from '../common/constants/reportTypeConstant';
import MyReportList from '../common/components/myReportList';
import { withRouter } from '../common/withRouter';
import { openModalFilter, closeModalFilter, getMyReports } from './action';
import { connect } from 'react-redux';
import LoadingScreen from '../common/components/loadingScreen';
import { Pagination } from 'react-bootstrap';

class MyReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myReports: null,
            currentPage: 1,
            maxPage: 1,
            query: '',
            filters: [
                {
                    id: 0,
                    name: 'status_list',
                    display: 'Status',
                    options: Object.values(reportStatusConstant).map(
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
                    options: Object.values(reportTypeConstant).map((type) => ({
                        id: type.name,
                        name: type.value,
                    })),
                },
            ],
            appliedFilters: [],
        };
    }

    componentDidMount() {
        this.props.getMyReportsFunction(
            this.state.currentPage,
            5,
            this.state.query,
            this.convertToFilterString(this.state.appliedFilters),
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.myReports !== this.props.myReports) {
            this.setState({
                myReports: this.props.myReports,
                maxPage:
                    this.props.myReports.total_rows > 0
                        ? Math.ceil(this.props.myReports.total_rows / 5)
                        : 1,
            });
        }
        if (
            prevState.currentPage !== this.state.currentPage &&
            prevState.query === this.state.query
        ) {
            this.setState({
                myReports: null,
            });
            this.props.getMyReportsFunction(
                this.state.currentPage,
                5,
                this.state.query,
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

    handleMyReportClicked = (id) => {
        this.props.navigate(`/report/${id}`);
    };

    handleCreateNewReportClicked = () => {
        this.props.navigate('/report/new');
    };

    handleFilterOption = (filters) => {
        let filterString = this.convertToFilterString(filters);
        this.setState({
            myReports: null,
            appliedFilters: filters,
            currentPage: 1,
        });
        this.props.getMyReportsFunction(
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
        this.props.getMyReportsFunction(
            this.state.currentPage,
            5,
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

    render() {
        if (this.state.myReports === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-myreport">
                <div className="container-myreport__header">
                    <FontAwesomeIcon icon={faFlag} className="icon-myreport" />
                    <h1>Keluhan Saya</h1>
                </div>
                <div className="container-myreport__body">
                    <div className="container-myreport__body__tools">
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
                        <button
                            className="btn btn-primary btn-add"
                            onClick={this.handleCreateNewReportClicked}
                        >
                            + Keluhan Baru
                        </button>
                    </div>
                    <div className="container-myreport__body__items">
                        <MyReportList
                            myReports={this.state.myReports}
                            handleMyReportClicked={this.handleMyReportClicked}
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
        myReports: state.myReport.myReports,
        filterModalOpen: state.myReport.filterModalOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
        getMyReportsFunction: (page, limit, query, filters) =>
            dispatch(getMyReports(page, limit, query, filters)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyReport),
);
