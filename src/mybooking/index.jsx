import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faTruck, faCalendarAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";

class MyBooking extends React.Component {
    render() {
        return(
            <div className="container-mybooking">
                <div className="container-mybooking__header">
                    <FontAwesomeIcon icon={ faUser } className="icon-mybooking" />
                    <h1>My Bookings</h1>
                </div>
                <div className="container-mybooking__body">
                    <div className="container-mybooking__body__tools">
                        <div className="search-bar">
                            <input
                                className="search-bar__input"
                                type="text"
                                name="bookingSearch"
                                placeholder="Pencarian"
                            />
                            <FontAwesomeIcon icon={ faSearch } className="icon-search" />
                        </div>
                        <div className="filter-bar">
                            <select
                                className="form-select form-select-hidden"
                                name="bookingFilter"
                                >
                                <option value="" disabled hidden selected>Status</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </div>
                    </div>
                    <div className="container-mybooking__body__items">
                        <div className="my-booking-item">
                            <div className="my-booking-item__header">
                                <div className="booking-type">
                                    <FontAwesomeIcon icon={ faTruck } className="icon-booking-type" />
                                    <label className="label-bookinng-type">Kendaraan</label>
                                </div>
                                <div className="booking-status pending">
                                    <label className="label-booking-status">Pengajuan Baru Diterima</label>
                                </div>
                            </div>
                            <div className="my-booking-item__body">
                                <h3 className="item-name">Brio</h3>
                                <p>Shooting</p>
                            </div>
                            <div className="my-booking-item__footer">
                                <div className="booking-date">
                                    <FontAwesomeIcon icon={ faCalendarAlt } className="icon-booking-date" />
                                    <label className="label-booking-date">dibuat 2 hari yang lalu oleh Saya</label>
                                </div>
                                <div className="booking-time">
                                    <label className="label-booking-time">04-01-2023 - 04-01-2023</label>
                                </div>
                            </div>
                        </div>
                        <div className="my-booking-item">
                            <div className="my-booking-item__header">
                                <div className="booking-type">
                                    <FontAwesomeIcon icon={ faBuilding } className="icon-booking-type" />
                                    <label className="label-bookinng-type">Gedung</label>
                                </div>
                                <div className="booking-status in-progress">
                                    <label className="label-booking-status">Proses Verifikasi</label>
                                </div>
                            </div>
                            <div className="my-booking-item__body">
                                <h3 className="item-name">Labtek VII</h3>
                                <p>Laboratorium Teknologi</p>
                            </div>
                            <div className="my-booking-item__footer">
                                <div className="booking-date">
                                    <FontAwesomeIcon icon={ faCalendarAlt } className="icon-booking-date" />
                                    <label className="label-booking-date">dibuat 2 hari yang lalu oleh Saya</label>
                                </div>
                                <div className="booking-time">
                                    <label className="label-booking-time">04-01-2023 - 04-01-2023</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyBooking;