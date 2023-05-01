import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFlag,
    faAngleLeft,
    faCalendarAlt,
    faUserEdit,
    faSave,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { withRouter } from '../../common/withRouter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import reportStatusConstant from '../../common/constants/reportStatusConstant';
import reportTypeConstant from '../../common/constants/reportTypeConstant';
import ReportStatusLabel from '../../common/components/labels/reportStatusLabel';
import ReportTypeLabel from '../../common/components/labels/reportTypeLabel';
import { connect } from 'react-redux';
import { editReport, getReport } from '../action';
import LoadingScreen from '../../common/components/loadingScreen';
import { getCreatedDateDiff } from '../../common/tools';
import StaffEditPopup from '../../common/components/staffEditPopup';
import AlertModal from '../../common/components/alertModal';

class ReportManagementDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            report: null,
            editStatus: false,
            editCategory: false,
            editAssignee: false,
            alertShow: false,
            alertMessage: '',
            assignee: '',
        };
    }

    componentDidMount() {
        this.props.getReportFunction(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.report !== this.props.report) {
            this.setState({
                report: this.props.report,
                assignee: this.props.report.user_assigned_name
                    ? this.props.report.user_assigned_name
                    : '',
            });
        }
        if (prevProps.editReportResponse !== this.props.editReportResponse) {
            this.props.getReportFunction(this.props.params.id);
            if (this.props.editReportResponse.message) {
                this.setState({
                    alertShow: true,
                    alertMessage: this.props.editReportResponse.message,
                });
            } else if (this.props.editReportResponse.error_message) {
                this.setState({
                    alertShow: true,
                    alertMessage: this.props.editReportResponse.error_message,
                });
            }
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/manage/report');
    };

    handleCategoryChange = (item) => {
        this.props.editReportFunction(this.state.report.id, {
            category: item.name,
        });
        this.setState({
            report: null,
            editCategory: false,
        });
    };

    handleStatusChange = (item) => {
        this.props.editReportFunction(this.state.report.id, {
            status: item.name,
        });
        this.setState({
            report: null,
            editStatus: false,
        });
    };

    handleEditAssignee = () => {
        this.props.editReportFunction(this.state.report.id, {
            user_assigned_name: this.state.assignee,
        });
        this.setState({
            report: null,
            editAssignee: false,
        });
    };

    render() {
        if (!this.state.report) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-reportmanagement-all">
                <AlertModal
                    show={this.state.alertShow}
                    message={this.state.alertMessage}
                    closeModalFunction={() => {
                        this.setState({
                            alertShow: false,
                            alertMessage: '',
                        });
                    }}
                />
                <div className="container-reportmanagement-detail">
                    <div className="container-reportmanagement-detail__header">
                        <FontAwesomeIcon
                            icon={faFlag}
                            className="icon-reportmanagement"
                        />
                        <h1>Manajemen Keluhan / {this.state.report.title}</h1>
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
                                    <h3 className="report-title">
                                        {this.state.report.title}
                                    </h3>
                                    <p className="report-place">
                                        {this.state.report.location}
                                    </p>
                                </div>
                                <div className="report-date-labels">
                                    <div className="report-date">
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="icon-report-date"
                                        />
                                        <label className="label-report-date">
                                            {getCreatedDateDiff(
                                                this.state.report.createdAt,
                                            )}{' '}
                                            oleh{' '}
                                            {this.state.report.creator.name}
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
                                    {this.state.report.image &&
                                        this.state.report.image.map(
                                            (image, index) => (
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
                                            ),
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
                            <div className="report-description">
                                <p>{this.state.report.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editable-report">
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Petugas</h2>
                            {this.state.editAssignee ? (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="clickable-edit"
                                    onClick={() =>
                                        this.setState({
                                            editAssignee:
                                                !this.state.editAssignee,
                                        })
                                    }
                                />
                            ) : (
                                this.state.report.status !== 'DONE' &&
                                this.state.report.status !==
                                    'WAITING_FOR_RATING' && (
                                    <p
                                        className="clickable-edit"
                                        onClick={() =>
                                            this.setState({
                                                editAssignee:
                                                    !this.state.editAssignee,
                                            })
                                        }
                                    >
                                        Edit
                                    </p>
                                )
                            )}
                        </div>
                        <div className="assignee-report__item">
                            {this.state.editAssignee ? (
                                <>
                                    <input
                                        className="input-assignee"
                                        type="text"
                                        value={this.state.assignee}
                                        onChange={(e) => {
                                            this.setState({
                                                assignee: e.target.value,
                                            });
                                        }}
                                    />
                                    {this.state.report.user_assigned_name !==
                                        this.state.assignee && (
                                        <FontAwesomeIcon
                                            icon={faSave}
                                            className="icon-save"
                                            id="save-button"
                                            onClick={this.handleEditAssignee}
                                        />
                                    )}
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faUserEdit} />
                                    <p>
                                        {this.state.report.user_assigned_name
                                            ? this.state.report
                                                  .user_assigned_name
                                            : '-'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Kategori</h2>
                            {this.state.report.status !== 'DONE' &&
                                this.state.report.status !==
                                    'WAITING_FOR_RATING' && (
                                    <p
                                        className="clickable-edit"
                                        onClick={() =>
                                            this.setState({
                                                editCategory: true,
                                            })
                                        }
                                    >
                                        Edit
                                    </p>
                                )}
                        </div>
                        <StaffEditPopup
                            show={this.state.editCategory}
                            onClose={() =>
                                this.setState({ editCategory: false })
                            }
                            title="Kategori"
                            itemConstants={reportTypeConstant}
                            selected={this.state.report.category}
                            handleClicked={this.handleCategoryChange}
                        />
                        <ReportTypeLabel
                            type={
                                reportTypeConstant[this.state.report.category]
                            }
                        />
                    </div>
                    <div className="editable-report__item">
                        <div className="header-editable-status">
                            <h2>Status</h2>
                            {this.state.report.status !== 'DONE' &&
                                this.state.report.status !==
                                    'WAITING_FOR_RATING' && (
                                    <p
                                        className="clickable-edit"
                                        onClick={() =>
                                            this.setState({
                                                editStatus:
                                                    !this.state.editStatus,
                                            })
                                        }
                                    >
                                        Edit
                                    </p>
                                )}
                        </div>
                        <StaffEditPopup
                            show={this.state.editStatus}
                            onClose={() => this.setState({ editStatus: false })}
                            title="Status"
                            itemConstants={Object.values(
                                reportStatusConstant,
                            ).filter(
                                (item) => item !== reportStatusConstant.DONE,
                            )}
                            selected={this.state.report.status}
                            handleClicked={this.handleStatusChange}
                        />
                        {this.state.report.status === 'WAITING_FOR_RATING' ? (
                            <ReportStatusLabel
                                status={reportStatusConstant['DONE']}
                            />
                        ) : (
                            <ReportStatusLabel
                                status={
                                    reportStatusConstant[
                                        this.state.report.status
                                    ]
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.reportManagement.report,
        editReportResponse: state.reportManagement.edit_response,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getReportFunction: (id) => dispatch(getReport(id)),
        editReportFunction: (id, data) => dispatch(editReport(id, data)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ReportManagementDetail),
);
