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

class MyBookingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBookings: [],
        };
    }

    componentDidMount() {
        this.setState({
            myBookings: this.props.myBookings,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myBookings !== this.props.myBookings) {
            this.setState({
                myBookings: this.props.myBookings,
            });
        }
    }

    render() {
        if (this.state.myBookings.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.myBookings.rows.map((myBooking) => {
            return (
                <div
                    className="my-booking-item"
                    onClick={() =>
                        this.props.handleMyBookingClicked(
                            myBooking.id,
                            myBooking.status,
                        )
                    }
                    key={myBooking.id}
                >
                    <div className="my-booking-item__header">
                        <FacilityTypeLabel
                            type={facilityTypeConstant[myBooking.category]}
                        />
                        <BookingStatusLabel
                            status={bookingStatusConstant[myBooking.status]}
                        />
                    </div>
                    <div className="my-booking-item__body">
                        <h3 className="item-name">
                            {myBooking.facility
                                ? (myBooking.unit ? myBooking.unit : '-') +
                                  ', ' +
                                  myBooking.facility.name
                                : '-'}
                        </h3>
                        <p>{myBooking.description}</p>
                    </div>
                    <div className="my-booking-item__footer">
                        <div className="booking-date">
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="icon-booking-date"
                            />
                            <label className="label-booking-date">
                                {getCreatedDateDiff(myBooking.createdAt)} oleh
                                Saya
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
                                                myBooking.start_timestamp,
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
                                                myBooking.end_timestamp,
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

export default MyBookingList;
