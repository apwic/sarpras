import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilter,
    faUser,
    faSearch,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import facilityTypeConstant from '../common/constants/facilityTypeConstant';
import FacilityTypeLabel from '../common/components/labels/facilityTypeLabel';
import bookingStatusConstant from '../common/constants/bookingStatusConstant';
import BookingStatusLabel from '../common/components/labels/bookingStatusLabel';

class MyReport extends React.Component {
    render() {
        return (
            <div className="container-myreport">
                <div className="container-myreport__header">
                    <FontAwesomeIcon icon={faUser} className="icon-myreport" />
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
                        <div
                            className="filter__items"
                            style={{ marginRight: '16px' }}
                        >
                            <FontAwesomeIcon icon={faFilter} />
                        </div>
                        <button>+ Keluhan Baru</button>
                    </div>
                    <div className="container-myreport__body__items">
                        <div className="my-report-item">
                            <div className="my-report-item__body">
                                <div className="item-labels">
                                    <FacilityTypeLabel
                                        type={facilityTypeConstant.ROOM}
                                    />
                                    <BookingStatusLabel
                                        status={bookingStatusConstant.PENDING}
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
                                        dibuat 2 hari yang lalu oleh Saya
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
                </div>
            </div>
        );
    }
}

export default MyReport;
