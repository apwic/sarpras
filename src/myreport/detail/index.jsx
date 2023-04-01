import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlag,
    faArrowLeft,
    faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from '../../common/withRouter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import reportStatusConstant from '../../common/constants/reportStatusConstant';
import reportTypeConstant from '../../common/constants/reportTypeConstant';
import ReportStatusLabel from '../../common/components/labels/reportStatusLabel';
import ReportTypeLabel from '../../common/components/labels/reportTypeLabel';

class MyReportDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myReport: null,
            images: [
                'https://www.w3schools.com/w3images/lights.jpg',
                'https://www.w3schools.com/w3images/nature.jpg',
                'https://www.w3schools.com/w3images/mountains.jpg',
            ],
        };
    }

    handleNavigateBack = () => {
        this.props.navigate('/report/my');
    };

    render() {
        return (
            <div className="container-myreport-detail">
                <div className="container-myreport-detail__header">
                    <FontAwesomeIcon icon={faFlag} className="icon-myreport" />
                    <h1>Keluhan Saya</h1>
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
                                <h3 className="report-title">WC Bocor</h3>
                                <p className="report-place">Labtek V</p>
                            </div>
                            <div className="report-date-labels">
                                <div className="report-date">
                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className="icon-report-date"
                                    />
                                    <label className="label-report-date">
                                        dibuat 2 hari yang lalu oleh Saya
                                    </label>
                                </div>
                                <div className="report-labels">
                                    <ReportTypeLabel
                                        type={reportTypeConstant.SANITATION}
                                    />
                                    <ReportStatusLabel
                                        status={reportStatusConstant.PENDING}
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
                                {this.state.images.map((image, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className="swiper-slide"
                                    >
                                        <div className="image-swiper">
                                            <img src={image} alt="report" />
                                        </div>
                                    </SwiperSlide>
                                ))}

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
                        <div className="report-description">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed euismod, nisl sed
                                consectetur lacinia, nunc nisl ultricies nunc,
                                ultricies nisl nunc vel nunc. Nulla facilisi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MyReportDetail);
