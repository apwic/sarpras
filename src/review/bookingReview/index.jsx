import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import FacilityTypeLabel from '../../common/components/labels/facilityTypeLabel';
import facilityTypeConstant from '../../common/constants/facilityTypeConstant';
import BookingStatusLabel from '../../common/components/labels/bookingStatusLabel';
import bookingStatusConstant from '../../common/constants/bookingStatusConstant';

class BookingReview extends React.Component {
    handleClickReview = (e) => {
        const star = document.getElementsByClassName('icon-star');
        const value =
            e.target.nodeName === 'svg'
                ? e.target.getAttribute('values')
                : e.target.parentNode.getAttribute('values');
        for (let i = 0; i < star.length; i++) {
            if (i < value) {
                star[i].classList.add('icon-star-selected');
            } else {
                star[i].classList.remove('icon-star-selected');
            }
        }
    };

    render() {
        return (
            <div className="container-review">
                <div className="container-review__header">
                    <FontAwesomeIcon icon={faUser} className="icon-review" />
                    <h1>Peminjaman Saya / Penilaian Peminjaman</h1>
                </div>
                <div className="container-review__body">
                    <div className="container-review__body__item">
                        <button className="back-btn">
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
                                <h2>Honda Brio</h2>
                                <div className="item__header__status">
                                    <FacilityTypeLabel
                                        type={facilityTypeConstant.VEHICLE}
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
                                    htmlFor="comment"
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
                                ></textarea>
                                <br />
                            </form>
                            <div className="btn-submit-right">
                                <button className="btn btn-primary btn-submit">
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

export default BookingReview;
