import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import FacilityTypeLabel from '../../common/components/labels/facilityTypeLabel';
import facilityTypeConstant from '../../common/constants/facilityTypeConstant';
import BookingStatusLabel from '../../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';
import { getMyBookingClicked } from '../../mybooking/action';
import { withRouter } from '../../common/withRouter';
import { connect } from 'react-redux';
import LoadingScreen from '../../common/components/loadingScreen';
import { setBookingReview } from '../action';
import LoadingOverlay from '../../common/components/loadingOverlay';
import AlertModal from '../../common/components/alertModal';

class BookingReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: null,
            star: 0,
            comment: '',
            showAlertModal: false,
            alertMessage: '',
        };
    }

    componentDidMount() {
        this.props.getMyBookingClickedFunction(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myBooking !== this.props.myBooking) {
            if (
                this.props.myBooking.status !==
                bookingStatusConstant.WAITING_FOR_RATING.name
            ) {
                this.props.navigate('/booking/my');
            }
            this.setState({
                booking: this.props.myBooking,
            });
        }
        if (
            prevProps.bookingReviewResponse !== this.props.bookingReviewResponse
        ) {
            if (this.props.bookingReviewResponse.message) {
                document
                    .querySelector('.loading-overlay')
                    .classList.remove('show');
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.bookingReviewResponse.message,
                });
                clearInterval(this.intervalId);
                this.intervalId = setInterval(() => {
                    this.props.navigate('/booking/' + this.state.booking.id);
                    clearInterval(this.intervalId);
                }, 1000);
            } else if (this.props.bookingReviewResponse.error_message) {
                document
                    .querySelector('.loading-overlay')
                    .classList.remove('show');
                this.setState({
                    showAlertModal: true,
                    alertMessage:
                        this.props.bookingReviewResponse.error_message,
                });
            }
        }
    }

    handleSubmit = () => {
        this.props.setBookingReviewFunction(
            this.state.booking.id,
            this.state.star,
            this.state.comment,
        );
        document.querySelector('.loading-overlay').classList.add('show');
    };

    handleClickReview = (e) => {
        const star = document.getElementsByClassName('icon-star');
        const value =
            e.target.nodeName === 'svg'
                ? e.target.getAttribute('values')
                : e.target.parentNode.getAttribute('values');
        this.setState({
            star: value,
        });
        for (let i = 0; i < star.length; i++) {
            if (i < value) {
                star[i].classList.add('icon-star-selected');
            } else {
                star[i].classList.remove('icon-star-selected');
            }
        }
    };

    handleBack = () => {
        this.props.navigate('/booking/my');
    };

    closeAlertModal = () => {
        this.setState({
            showAlertModal: false,
        });
    };

    render() {
        if (!this.state.booking) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-review">
                <LoadingOverlay />
                <AlertModal
                    show={this.state.showAlertModal}
                    message={this.state.alertMessage}
                    closeModalFunction={this.closeAlertModal}
                />
                <div className="container-review__header">
                    <FontAwesomeIcon icon={faUser} className="icon-review" />
                    <h1>Peminjaman Saya / Penilaian Peminjaman</h1>
                </div>
                <div className="container-review__body">
                    <div className="container-review__body__item">
                        <button className="back-btn" onClick={this.handleBack}>
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
                    <div className="container-review__body__item">
                        <div className="item">
                            <div className="item__header">
                                <h2>{this.state.booking.facility.name}</h2>
                                <div className="item__header__status">
                                    <FacilityTypeLabel
                                        type={
                                            facilityTypeConstant[
                                                this.state.booking.category
                                            ]
                                        }
                                    />
                                    <BookingStatusLabel
                                        status={
                                            bookingStatusConstant.WAITING_FOR_RATING
                                        }
                                    />
                                </div>
                            </div>
                            <form>
                                <br />
                                <label
                                    className="form-label"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Penilaian
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <div className="form-stars">
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="icon-star"
                                        values={1}
                                        onClick={(e) =>
                                            this.handleClickReview(e)
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="icon-star"
                                        values={2}
                                        onClick={(e) =>
                                            this.handleClickReview(e)
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="icon-star"
                                        values={3}
                                        onClick={(e) =>
                                            this.handleClickReview(e)
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="icon-star"
                                        values={4}
                                        onClick={(e) =>
                                            this.handleClickReview(e)
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="icon-star"
                                        values={5}
                                        onClick={(e) =>
                                            this.handleClickReview(e)
                                        }
                                    />
                                </div>
                                <br />
                                <label
                                    className="form-label"
                                    htmlFor="comment"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    Komentar
                                    <p style={{ color: 'red' }}>*</p>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="comment"
                                    rows="8"
                                    placeholder="Masukkan komentar..."
                                    value={this.state.comment}
                                    onChange={(e) =>
                                        this.setState({
                                            comment: e.target.value,
                                        })
                                    }
                                ></textarea>
                                <br />
                            </form>
                            <div className="btn-submit-right">
                                <button
                                    className="btn btn-primary btn-submit"
                                    disabled={
                                        this.state.star === 0 ||
                                        this.state.comment === ''
                                    }
                                    onClick={this.handleSubmit}
                                >
                                    Kirim
                                </button>
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
        bookingReviewResponse: state.review.bookingReviewResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyBookingClickedFunction: (id) => dispatch(getMyBookingClicked(id)),
        setBookingReviewFunction: (id, rating, description) =>
            dispatch(setBookingReview(id, rating, description)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingReview),
);
