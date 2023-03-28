import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import BookingStatusLabel from '../../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';
import { getMyBookingClicked } from '../action';
import { withRouter } from '../../common/withRouter';
import { connect } from 'react-redux';

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

    render() {
        let start_date = this.state.myBooking.start_timestamp?.slice(0, 10);
        let end_date = this.state.myBooking.end_timestamp?.slice(0, 10);
        return (
            <div className="container-mybooking-detail">
                <div className="container-mybooking-detail__header">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="icon-mybooking-detail"
                    />
                    <h1>
                        Peminjaman Saya / {this.state.myBooking.facility_id}
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
                                            <td className="item-detail__label">
                                                Kendaraan
                                            </td>
                                            <td className="item-detail__value">
                                                {
                                                    this.state.myBooking
                                                        .facility_id
                                                }
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
                                                {start_date} - {end_date}
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
                                        <tr>
                                            <td className="item-detail__label">
                                                Plat Nomor
                                            </td>
                                            <td className="item-detail__value">
                                                B 1234 ABC
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="item-detail__label">
                                                Durasi
                                            </td>
                                            <td className="item-detail__value">
                                                1 Hari
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <BookingStatusLabel
                                status={bookingStatusConstant.PENDING}
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
