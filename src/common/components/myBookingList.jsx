import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import bookingStatusConstant from '../constants/bookingStatusConstant';
import facilityTypeConstant from '../constants/facilityTypeConstant';
import FacilityTypeLabel from './labels/facilityTypeLabel';
import EmptyScreen from './emptyScreen';
import BookingStatusLabel from './labels/bookingStatusLabel';

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

    daysDiff = (date) => {
        const today = new Date();
        const bookingDate = new Date(date);
        const diffTime = today - bookingDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    render() {
        if (this.state.myBookings.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.myBookings.map((myBooking) => {
            return (
                <a
                    onClick={() =>
                        this.props.handleMyBookingClicked(myBooking.id)
                    }
                    key={myBooking.id}
                >
                    <div className="my-booking-item">
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
                                    ? myBooking.facility.name
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
                                    dibuat{' '}
                                    {this.daysDiff(
                                        myBooking.createdAt.slice(0, 10),
                                    )}{' '}
                                    hari yang lalu oleh Saya
                                </label>
                            </div>
                            <div className="booking-time">
                                <label className="label-booking-time">
                                    {myBooking.start_timestamp.slice(0, 10)} -{' '}
                                    {myBooking.end_timestamp.slice(0, 10)}
                                </label>
                            </div>
                        </div>
                    </div>
                </a>
            );
        });
    }
}

export default MyBookingList;
