import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faFlag,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import reportStatusConstant from '../common/constants/reportStatusConstant';
import { Pagination } from 'react-bootstrap';
import { withRouter } from '../common/withRouter';
import { connect } from 'react-redux';
import { getReports } from './action';
import LoadingScreen from '../common/components/loadingScreen';
import FilterModal from '../common/components/filterModal';
import { closeModalFilter, openModalFilter } from '../booking/action';
import MyReportList from '../common/components/myReportList';

class ReportManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            maxPage: 0,
            filters: [],
            appliedFilters: [],
            currentPage: 1,
            q: '',
        };
    }

    componentDidMount() {
        this.props.getReportsFunction(
            1,
            5,
            this.state.q,
            'category=' + this.props.user.role.replace('_STAFF', ''),
        );
        let filters = [
            {
                name: 'status',
                display: 'Status',
                id: 0,
                options: [],
            },
        ];
        for (let status in reportStatusConstant) {
            filters[0].options.push({
                name: reportStatusConstant[status].value,
                id: reportStatusConstant[status].name,
            });
        }
        this.setState({
            filters: filters,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.reports !== this.props.reports) {
            this.setState({
                reports: this.props.reports,
                maxPage: Math.ceil(this.props.reports.total_rows / 5),
            });
        }
        if (
            prevState.currentPage !== this.state.currentPage &&
            prevState.q === this.state.q
        ) {
            this.setState({
                reports: [],
            });
            this.props.getReportsFunction(
                this.state.currentPage,
                5,
                this.state.q,
                this.convertToFilterString(this.state.appliedFilters),
            );
        }
    }

    handleFilterOption = (filters) => {
        let filterString = this.convertToFilterString(filters);
        this.setState({
            reports: [],
            appliedFilters: filters,
            currentPage: 1,
        });
        this.props.getReportsFunction(1, 5, this.state.q, filterString);
    };

    convertToFilterString = (filters) => {
        if (filters.length === 0) {
            return 'category=' + this.props.user.role.replace('_STAFF', '');
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
        filterString +=
            (filterString === '' ? '' : '&') +
            'category=' +
            this.props.user.role.replace('_STAFF', '');
        return filterString;
    };

    handleSearch = (e) => {
        this.setState({
            q: e.target.value,
            currentPage: 1,
        });
        this.props.getReportsFunction(
            1,
            5,
            e.target.value,
            this.convertToFilterString(this.state.appliedFilters),
        );
    };

    renderPaginationNumbers = () => {
        let paginationNumbers = [];
        if (this.state.maxPage <= 0) {
            return <Pagination.Item active={true}>1</Pagination.Item>;
        }
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
        if (this.state.reports.length === 0) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-myreport">
                <FilterModal
                    filterlist={this.state.filters}
                    filters={this.state.appliedFilters}
                    filtersubmitfunction={this.handleFilterOption}
                />
                <div className="container-myreport__header">
                    <FontAwesomeIcon icon={faFlag} className="icon-myreport" />
                    <h1>Manajemen Keluhan</h1>
                </div>
                <div className="container-myreport__body">
                    <div className="container-myreport__body__tools">
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
                    <div className="container-myreport__body__items">
                        <MyReportList
                            myReports={this.state.reports}
                            handleMyReportClicked={(id) =>
                                this.props.navigate(`/manage/report/${id}`)
                            }
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
                                        this.state.currentPage >=
                                        this.state.maxPage
                                            ? this.state.maxPage
                                            : this.state.currentPage + 1,
                                })
                            }
                        />
                        <Pagination.Last
                            onClick={() =>
                                this.setState({
                                    currentPage: this.state.maxPage,
                                })
                            }
                        />
                    </Pagination>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.reportManagement.reports,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReportsFunction: (page, limit, query, filters) =>
            dispatch(getReports(page, limit, query, filters)),
        openModalFunction: () => dispatch(openModalFilter()),
        closeModalFunction: () => dispatch(closeModalFilter()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ReportManagement),
);
