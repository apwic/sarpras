import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlag,
    faAngleLeft,
    faCalendarAlt,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from '../../common/withRouter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import reportStatusConstant from '../../common/constants/reportStatusConstant';
import reportTypeConstant from '../../common/constants/reportTypeConstant';
import ReportStatusLabel from '../../common/components/labels/reportStatusLabel';
import ReportTypeLabel from '../../common/components/labels/reportTypeLabel';

class ReportManagementDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reportmanagement: null,
            images: [
                'https://www.w3schools.com/w3images/lights.jpg',
                'https://www.w3schools.com/w3images/nature.jpg',
                'https://www.w3schools.com/w3images/mountains.jpg',
            ],
        };
    }

    handleNavigateBack = () => {
        this.props.navigate('/manage/report');
    };

    render() {
        return (
            <div className="container-reportmanagement-all">
                <div className="container-reportmanagement-detail">
                    <div className="container-reportmanagement-detail__header">
                        <FontAwesomeIcon
                            icon={faFlag}
                            className="icon-reportmanagement"
                        />
                        <h1>Manajemen Keluhan / WC Bocor</h1>
                    </div>
                    <div className="container-reportmanagement-detail__body">
                        <div className="container-reportmanagement-detail__body__nav">
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
                        <div className="container-reportmanagement-detail__body__item">
                            <div className="report-header">
                                <div className="report-detail">
                                    <h3 className="report-title">WC Bocor</h3>
                                    <p className="report-place">Labtek 0</p>
                                </div>
                                <div className="report-date-labels">
                                    <div className="report-date">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="icon-report-date"
                                        />
                                        <label className="label-report-date">
                                            dibuat 2 hari yang lalu oleh Ocep
                                        </label>
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
                                    consectetur lacinia, nunc nisl ultricies
                                    nunc, ultricies nisl nunc vel nunc. Nulla
                                    facilisi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editable-report">
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Assignee</h2>
                            <p className="clickable-edit">Edit</p>
                        </div>
                        <div className="assignee-report__item">
                            <FontAwesomeIcon icon={faUserEdit} />
                            <p>I Gede Array</p>
                        </div>
                    </div>
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Kategori</h2>
                            <p className="clickable-edit">Edit</p>
                        </div>
                        <ReportTypeLabel type={reportTypeConstant.DEFECT} />
                    </div>
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Status</h2>
                            <p className="clickable-edit">Edit</p>
                        </div>
                        <ReportStatusLabel
                            status={reportStatusConstant.CANCELED}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReportManagementDetail);
