import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faSearch,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import FacilityTypeLabel from '../common/components/labels/facilityTypeLabel';
import facilityTypeConstant from '../common/constants/facilityTypeConstant';
import BookingStatusLabel from '../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../common/constants/bookingStatusConstant';

class MyBooking extends React.Component {
    render() {
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
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icon-search"
                            />
                        </div>
                        <div className="filter-bar">
                            <select
                                className="form-select form-select-hidden"
                                name="bookingFilter"
                                defaultValue={''}
                            >
                                <option value="" disabled hidden>
                                    Status
                                </option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>
                    <div className="container-mybooking__body__items">
                        <div className="my-booking-item">
                            <div className="my-booking-item__header">
                                <FacilityTypeLabel
                                    type={facilityTypeConstant.VEHICLE}
                                />
                                <BookingStatusLabel
                                    status={bookingStatusConstant.REJECTED}
                                />
                            </div>
                            <div className="my-booking-item__body">
                                <h3 className="item-name">Brio</h3>
                                <p>Shooting</p>
                            </div>
                            <div className="my-booking-item__footer">
                                <div className="booking-date">
                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="icon-booking-date"
                                    />
                                    <label className="label-booking-date">
                                        dibuat 2 hari yang lalu oleh Saya
                                    </label>
                                </div>
                                <div className="booking-time">
                                    <label className="label-booking-time">
                                        04-01-2023 - 04-01-2023
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="my-booking-item">
                            <div className="my-booking-item__header">
                                <FacilityTypeLabel
                                    type={facilityTypeConstant.BUILDING}
                                />
                                <BookingStatusLabel
                                    status={
                                        bookingStatusConstant.WAITING_FOR_PAYMENT
                                    }
                                />
                            </div>
                            <div className="my-booking-item__body">
                                <h3 className="item-name">Labtek VII</h3>
                                <p>Laboratorium Teknologi</p>
                            </div>
                            <div className="my-booking-item__footer">
                                <div className="booking-date">
                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="icon-booking-date"
                                    />
                                    <label className="label-booking-date">
                                        dibuat 2 hari yang lalu oleh Saya
                                    </label>
                                </div>
                                <div className="booking-time">
                                    <label className="label-booking-time">
                                        04-01-2023 - 04-01-2023
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyBooking;
