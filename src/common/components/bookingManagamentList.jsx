import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import bookingStatusConstant from '../constants/bookingStatusConstant';
import facilityTypeConstant from '../constants/facilityTypeConstant';
import FacilityTypeLabel from './labels/facilityTypeLabel';
import EmptyScreen from './emptyScreen';
import BookingStatusLabel from './labels/bookingStatusLabel';
import { getCreatedDateDiff } from '../tools';

class bookingManagamentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingList: [],
        };
    }

    componentDidMount() {
        this.setState({
            bookingList: this.props.bookingList,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bookingList !== this.props.bookingList) {
            this.setState({
                bookingList: this.props.bookingList,
            });
        }
    }

    daysDiff = (date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        const diffTime = today - bookingDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    render() {
        if (this.state.bookingList.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.bookingList.rows.map((booking) => {
            return (
                <div
                    className="bookingList-item"
                    onClick={() =>
                        this.props.handleBookingManagementClicked(booking.id)
                    }
                    key={booking.id}
                >
                    <div className="bookingList-item__header">
                        <FacilityTypeLabel
                            type={facilityTypeConstant[booking.category]}
                        />
                        <BookingStatusLabel
                            status={bookingStatusConstant[booking.status]}
                        />
                    </div>
                    <div className="bookingList-item__body">
                        <h3 className="item-name">
                            {booking.facility ? booking.facility.name : '-'}
                        </h3>
                        <p>{booking.description}</p>
                    </div>
                    <div className="bookingList-item__footer">
                        <div className="booking-date">
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="icon-booking-date"
                            />
                            <label className="label-booking-date">
                                {getCreatedDateDiff(booking.createdAt)} oleh{' '}
                                {booking.user.name}
                            </label>
                        </div>
                        <div className="booking-time">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="booking-time__label">
                                            Waktu Mulai
                                        </td>
                                        <td className="booking-time__value">
                                            {new Date(
                                                booking.start_timestamp,
                                            ).toLocaleString('id-ID')}
                                            {' WIB'}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="booking-time__label">
                                            Waktu Selesai
                                        </td>
                                        <td className="booking-time__value">
                                            {new Date(
                                                booking.end_timestamp,
                                            ).toLocaleString('id-ID')}
                                            {' WIB'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export default bookingManagamentList;
