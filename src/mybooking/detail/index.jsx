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
            duration: 0,
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
                duration: this.props.myBooking.createdAt,
            });
            this.setState({ loading: false });
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/booking/my');
    };

    daysDiff = (date1, date2) => {
        let diffTime = new Date(date2) - new Date(date1);
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
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
                                                    : ''}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Nama
                                            </td>
                                            <td className="item-detail__value">
                                                {this.state.myBooking.user_id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Tanggal Sewa
                                            </td>
                                            <td className="item-detail__value">
                                                {this.state.myBooking.start_timestamp.slice(
                                                    0,
                                                    10,
                                                )}{' '}
                                                -{' '}
                                                {this.state.myBooking.end_timestamp.slice(
                                                    0,
                                                    10,
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Deskripsi
                                            </td>
                                            <td className="item-detail__value">
                                                {
                                                    this.state.myBooking
                                                        .description
                                                }
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
                                                    {
                                                        this.state.myBooking
                                                            .facility
                                                            .license_number
                                                    }
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td className="item-detail__label">
                                                Durasi
                                            </td>
                                            <td className="item-detail__value">
                                                {this.daysDiff(
                                                    this.state.myBooking.start_timestamp.slice(
                                                        0,
                                                        10,
                                                    ),
                                                    this.state.myBooking.end_timestamp.slice(
                                                        0,
                                                        10,
                                                    ),
                                                )}{' '}
                                                hari
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
