import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

import '../style.css';
import ReportTypeLabel from '../../common/components/labels/reportTypeLabel';
import reportTypeConstant from '../../common/constants/reportTypeConstant';
import ReportStatusLabel from '../../common/components/labels/reportStatusLabel';
import reportStatusConstant from '../../common/constants/reportStatusConstant';
import LoadingScreen from '../../common/components/loadingScreen';
import LoadingOverlay from '../../common/components/loadingOverlay';
import AlertModal from '../../common/components/alertModal';
import { setReportReview } from '../action';
import { withRouter } from '../../common/withRouter';
import { connect } from 'react-redux';
import { getMyReportClicked } from '../../myreport/action';

class ReportReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null,
            star: 0,
            comment: '',
            showAlertModal: false,
            alertMessage: '',
        };
    }

    componentDidMount() {
        this.props.getMyReportClickedFunction(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myReport !== this.props.myReport) {
            if (
                this.props.myReport.status !==
                reportStatusConstant.WAITING_FOR_RATING.name
            ) {
                this.props.navigate('/report/my');
            }
            this.setState({
                report: this.props.myReport,
            });
        }
        if (
            prevProps.reportReviewResponse !== this.props.reportReviewResponse
        ) {
            if (this.props.reportReviewResponse.message) {
                document
                    .querySelector('.loading-overlay')
                    .classList.remove('show');
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.reportReviewResponse.message,
                });
                clearInterval(this.intervalId);
                this.intervalId = setInterval(() => {
                    this.props.navigate('/report/' + this.state.report.id);
                    clearInterval(this.intervalId);
                }, 1000);
            } else if (this.props.reportReviewResponse.error_message) {
                document
                    .querySelector('.loading-overlay')
                    .classList.remove('show');
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.reportReviewResponse.error_message,
                });
            }
        }
    }

    handleSubmit = () => {
        this.props.setReportReviewFunction(
            this.state.report.id,
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
        this.props.navigate('/report/my');
    };

    closeAlertModal = () => {
        this.setState({
            showAlertModal: false,
        });
    };

    render() {
        if (!this.state.report) {
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
                    <h1>Keluhan Saya / Penilaian Keluhan</h1>
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
                                <h2>{this.state.report.title}</h2>
                                <div className="item__header__status">
                                    <ReportTypeLabel
                                        type={
                                            reportTypeConstant[
                                                this.state.report.category
                                            ]
                                        }
                                    />
                                    <ReportStatusLabel
                                        status={
                                            reportStatusConstant.WAITING_FOR_RATING
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
        myReport: state.myReport.myReportClicked,
        reportReviewResponse: state.review.reportReviewResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyReportClickedFunction: (id) => dispatch(getMyReportClicked(id)),
        setReportReviewFunction: (id, rating, description) =>
            dispatch(setReportReview(id, rating, description)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ReportReview),
);
