import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faFlag,
    faSearch,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import ReportStatusLabel from '../common/components/labels/reportStatusLabel';
import reportStatusConstant from '../common/constants/reportStatusConstant';
import ReportTypeLabel from '../common/components/labels/reportTypeLabel';
import reportTypeConstant from '../common/constants/reportTypeConstant';
import { Pagination } from 'react-bootstrap';

class ReportManagement extends React.Component {
    render() {
        return (
            <div className="container-myreport">
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
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div
                            className="filter__items"
                            style={{ marginRight: '16px' }}
                        >
                            <FontAwesomeIcon
                                icon={faFilter}
                                onClick={() => this.props.openModalFunction()}
                                className="icon-filter-item"
                            />
                        </div>
                    </div>
                    <div className="container-myreport__body__items">
                        <div className="my-report-item">
                            <div className="my-report-item__body">
                                <div className="item-labels">
                                    <ReportTypeLabel
                                        type={reportTypeConstant.DEFECT}
                                    />
                                    <ReportStatusLabel
                                        status={
                                            reportStatusConstant.IN_PROGRESS
                                        }
                                    />
                                </div>
                                <div className="item-details">
                                    <h3 className="item-name">WC Bocor</h3>
                                    <p>Lantai 4</p>
                                </div>
                                <div className="report-date">
                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="icon-report-date"
                                    />
                                    <label className="label-report-date">
                                        dibuat 2 hari yang lalu oleh Arip Dandi
                                    </label>
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
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        );
    }
}

export default ReportManagement;
