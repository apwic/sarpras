import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlag,
    faArrowLeft,
    faCalendarAlt,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from '../../common/withRouter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import reportStatusConstant from '../../common/constants/reportStatusConstant';
import reportTypeConstant from '../../common/constants/reportTypeConstant';
import ReportStatusLabel from '../../common/components/labels/reportStatusLabel';
import ReportTypeLabel from '../../common/components/labels/reportTypeLabel';
import { getMyReportClicked } from '../action';
import { connect } from 'react-redux';
import LoadingScreen from '../../common/components/loadingScreen';
import { getCreatedDateDiff } from '../../common/tools';

class MyReportDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myReport: null,
            loading: true,
        };
    }

    componentDidMount() {
        this.props.getMyReportClickedFunction(this.props.params.id.toString());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myReport !== this.props.myReport) {
            if (
                this.props.myReport.status ===
                reportStatusConstant.WAITING_FOR_RATING.name
            ) {
                this.props.navigate(
                    '/report/' + this.props.myReport.id + '/review',
                );
            }
            this.setState({
                myReport: this.props.myReport,
            });
            this.setState({ loading: false });
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/report/my');
    };

    render() {
        if (this.state.loading) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-myreport-detail">
                <div className="container-myreport-detail__header">
                    <FontAwesomeIcon icon={faFlag} className="icon-myreport" />
                    <h1>Keluhan Saya / {this.state.myReport.title}</h1>
                </div>
                <div className="container-myreport-detail__body">
                    <div className="container-myreport-detail__body__nav">
                        <button
                            className="back-btn"
                            onClick={this.handleNavigateBack}
                        >
                            <FontAwesomeIcon
                                icon={faArrowLeft}
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
                    <div className="container-myreport-detail__body__item">
                        <div className="report-header">
                            <div className="report-detail">
                                <h3 className="report-title">
                                    {this.state.myReport.title}
                                </h3>
                                <h4 className="report-location">
                                    {this.state.myReport.location}
                                </h4>
                            </div>
                            <div className="report-date-labels">
                                <div className="report-date">
                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="icon-report-date"
                                    />
                                    <label className="label-report-date">
                                        {getCreatedDateDiff(
                                            this.state.myReport.createdAt,
                                        )}{' '}
                                        oleh Saya
                                    </label>
                                </div>
                                <div className="report-labels">
                                    <ReportTypeLabel
                                        type={
                                            reportTypeConstant[
                                                this.state.myReport.category
                                            ]
                                        }
                                    />
                                    <ReportStatusLabel
                                        status={
                                            reportStatusConstant[
                                                this.state.myReport.status
                                            ]
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="report-picture">
                            <Swiper
                                grabCursor={true}
                                spaceBetween={50}
                                slidesPerView={1}
                                loop={true}
                                modules={[Pagination, Navigation]}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                    clickable: true,
                                }}
                            >
                                {this.state.myReport.image.length > 0 ? (
                                    this.state.myReport.image.map(
                                        (image, index) => {
                                            return (
                                                <SwiperSlide
                                                    key={index}
                                                    className="swiper-slide"
                                                >
                                                    <div className="image-swiper">
                                                        <img
                                                            src={image}
                                                            alt="report"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        },
                                    )
                                ) : (
                                    <SwiperSlide className="swiper-slide">
                                        <h1>
                                            Tidak ada gambar yang dapat
                                            ditampilkan
                                        </h1>
                                    </SwiperSlide>
                                )}
                                <div className="slider-controler">
                                    <div className="swiper-button-prev slider-arrow">
                                        <ion-icon name="arrow-back-outline"></ion-icon>
                                    </div>
                                    <div className="swiper-button-next slider-arrow">
                                        <ion-icon name="arrow-forward-outline"></ion-icon>
                                    </div>
                                    <div className="swiper-pagination"></div>
                                </div>
                            </Swiper>
                        </div>
                        <div className="report-information">
                            <p className="report-description">
                                {this.state.myReport.description}
                            </p>
                        </div>
                    </div>
                    {this.state.myReport.status ===
                        reportStatusConstant.DONE.name && (
                        <div className="container-myreport-detail__body__item">
                            <h3 className="item-title">Penilaian</h3>
                            <div className="form-stars">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={
                                        this.state.myReport.review.rating >= 1
                                            ? 'icon-star icon-star-selected'
                                            : 'icon-star'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={
                                        this.state.myReport.review.rating >= 2
                                            ? 'icon-star icon-star-selected'
                                            : 'icon-star'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={
                                        this.state.myReport.review.rating >= 3
                                            ? 'icon-star icon-star-selected'
                                            : 'icon-star'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={
                                        this.state.myReport.review.rating >= 4
                                            ? 'icon-star icon-star-selected'
                                            : 'icon-star'
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={
                                        this.state.myReport.review.rating >= 5
                                            ? 'icon-star icon-star-selected'
                                            : 'icon-star'
                                    }
                                />
                            </div>
                            <div className="booking-description">
                                <p>{this.state.myReport.review.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        myReport: state.myReport.myReportClicked,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMyReportClickedFunction: (id) => dispatch(getMyReportClicked(id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MyReportDetail),
);
