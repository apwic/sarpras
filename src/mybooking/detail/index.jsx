import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import BookingStatusLabel from '../../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';
import { getMyBookingClicked } from '../action';
import { withRouter } from '../../common/withRouter';
import { connect } from 'react-redux';
import LoadingScreen from '../../common/components/loadingScreen';
import facilityTypeConstant from '../../common/constants/facilityTypeConstant';

class MyBookingDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myBooking: {},
            loading: true,
        };
    }

    componentDidMount() {
        this.props.getMyBookingClickedFunction(this.props.params.id.toString());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myBooking !== this.props.myBooking) {
            this.setState({
                myBooking: this.props.myBooking,
            });
            this.setState({ loading: false });
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/booking/my');
    };

    getDuration = (startDate, endDate) => {
        let diffTime = new Date(endDate) - new Date(startDate);
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        let diffMinutes = Math.floor(diffTime / (1000 * 60));
        let duration = '';
        if (diffDays > 0) {
            duration += diffDays + ' hari ';
        } else if (diffHours > 0) {
            duration += diffHours + ' jam ';
        } else if (diffMinutes > 0) {
            duration += diffMinutes + ' menit ';
        } else {
            return '0 menit';
        }
        return duration.trim();
    };

    render() {
        if (this.state.loading) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-mybooking-detail">
                <div className="container-mybooking-detail__header">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icon-mybooking-detail"
                    />
                    <h1>
                        Peminjaman Saya /{' '}
                        {this.state.myBooking.facility
                            ? this.state.myBooking.facility.name
                            : '-'}
                    </h1>
                </div>
                <div className="container-mybooking-detail__body">
                    <div className="container-mybooking-detail__body__item">
                        <button
                            className="back-btn"
                            onClick={this.handleNavigateBack}
                        >
                            <FontAwesomeIcon
                                icon={faAngleLeft}
                                className="icon-back"
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    marginRight: '10px',
                                }}
                            />
                            Back
                        </button>
                    </div>
                    <div className="container-mybooking-detail__body__item">
                        <div className="item-container">
                            <h3 className="item-title">Rincian Peminjaman</h3>
                            <div className="item-detail">
                                <table>
                                    <tbody>
                                        <tr>
                                            {this.state.myBooking.category ===
                                                facilityTypeConstant.BUILDING
                                                    .name && (
                                                <td className="item-detail__label">
                                                    Gedung
                                                </td>
                                            )}
                                            {this.state.myBooking.category ===
                                                facilityTypeConstant.ROOM
                                                    .name && (
                                                <td className="item-detail__label">
                                                    Ruangan
                                                </td>
                                            )}
                                            {this.state.myBooking.category ===
                                                facilityTypeConstant.SELASAR
                                                    .name && (
                                                <td className="item-detail__label">
                                                    Selasar
                                                </td>
                                            )}
                                            {this.state.myBooking.category ===
                                                facilityTypeConstant.VEHICLE
                                                    .name && (
                                                <td className="item-detail__label">
                                                    Kendaraan
                                                </td>
                                            )}
                                            <td className="item-detail__value">
                                                {this.state.myBooking.facility
                                                    ? this.state.myBooking
                                                          .facility.name
                                                    : '-'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Nama
                                            </td>
                                            <td className="item-detail__value">
                                                {this.props.user.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Waktu Mulai Sewa
                                            </td>
                                            <td className="item-detail__value">
                                                {new Date(
                                                    this.state.myBooking.start_timestamp,
                                                ).toLocaleString()}{' '}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Waktu Selesai Sewa
                                            </td>
                                            <td className="item-detail__value">
                                                {new Date(
                                                    this.state.myBooking.end_timestamp,
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Deskripsi
                                            </td>
                                            <td className="item-detail__value">
                                                {this.state.myBooking.facility
                                                    ? this.state.myBooking
                                                          .facility.description
                                                    : '-'}
                                            </td>
                                        </tr>
                                        {this.state.myBooking.category ===
                                            facilityTypeConstant.VEHICLE
                                                .name && (
                                            <tr>
                                                <td className="item-detail__label">
                                                    Plat Nomor
                                                </td>
                                                <td className="item-detail__value">
                                                    {this.state.myBooking
                                                        .facility
                                                        ? this.state.myBooking
                                                              .facility
                                                              .license_number
                                                        : '-'}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="item-detail__label">
                                                Durasi
                                            </td>
                                            <td className="item-detail__value">
                                                {this.getDuration(
                                                    new Date(
                                                        this.state.myBooking.start_timestamp,
                                                    ),
                                                    new Date(
                                                        this.state.myBooking.end_timestamp,
                                                    ),
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <BookingStatusLabel
                                status={
                                    bookingStatusConstant[
                                        this.state.myBooking.status
                                    ]
                                }
                            />
                            <div className="total-price">
                                <h3 className="total-price__label">
                                    Total Biaya
                                </h3>
                                <h3 className="total-price__value">
                                    Rp{this.state.myBooking.cost}
                                </h3>
                            </div>
                        </div>
                        <div className="item-container">
                            <h3 className="item-title">Deskripsi</h3>
                            <div className="booking-description">
                                <p>{this.state.myBooking.description}</p>
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
        myBooking: state.myBooking.myBookingClicked,
        user: state.auth.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyBookingClickedFunction: (id) => dispatch(getMyBookingClicked(id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyBookingDetail),
);
