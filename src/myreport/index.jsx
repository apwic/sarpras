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
        this.props.getMyReportsFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myReports !== this.props.myReports) {
            this.setState({
                myReports: this.props.myReports,
            });
        }
    }

    handleMyReportClicked = (id) => {
        this.props.navigate(`/report/${id}`);
    };

    handleCreateNewReportClicked = () => {
        this.props.navigate('/report/new');
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
        getMyReportsFunction: () => dispatch(getMyReports()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyReport),
);
