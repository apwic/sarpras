import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faFlag,
    faSearch,
    faCalendarAlt,
    faUserEdit,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import FilterModal from '../common/components/filterModal';
import reportStatusConstant from '../common/constants/reportStatusConstant';
import reportTypeConstant from '../common/constants/reportTypeConstant';
import ReportStatusLabel from '../common/components/labels/reportStatusLabel';
import ReportTypeLabel from '../common/components/labels/reportTypeLabel';
import { withRouter } from '../common/withRouter';
import { openModalFilter } from '../booking/action';
import { connect } from 'react-redux';

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

    handleMyReportClicked = () => {
        this.props.navigate('/report/1');
    };

    render() {
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
                        <button className="btn btn-primary btn-add">
                            + Keluhan Baru
                        </button>
                    </div>
                    <div className="container-myreport__body__items">
                        <div
                            className="my-report-item"
                            onClick={this.handleMyReportClicked}
                        >
                            <div className="my-report-item__body">
                                <div className="item-labels">
                                    <ReportTypeLabel
                                        type={reportTypeConstant.SANITATION}
                                    />
                                    <ReportStatusLabel
                                        status={reportStatusConstant.PENDING}
                                    />
                                </div>
                                <div className="item-details">
                                    <h3 className="item-name">WC Bocor</h3>
                                    <p>Lantai 4</p>
                                </div>
                                <div className="item-footer">
                                    <div className="report-date">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="icon-report-date"
                                        />
                                        <label className="label-report-date">
                                            dibuat 2 hari yang lalu oleh Saya
                                        </label>
                                    </div>
                                    <div className="report-assignment">
                                        <FontAwesomeIcon
                                            icon={faUserEdit}
                                            className="icon-report-assignment"
                                        />
                                        <label className="label-report-assignment">
                                            ditugaskan kepada Djunaedi
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="my-report-item__image">
                                <img
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                    alt="report image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modalFilter: state.myReport.modalFilter,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalFunction: () => dispatch(openModalFilter()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyReport),
);
