import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faAngleLeft,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { connect } from 'react-redux';
import { getFacilityClicked } from '../action';
import LoadingScreen from '../../common/components/loadingScreen';
import { withRouter } from '../../common/withRouter';
import { postBookingStart } from '../action';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import AlertModal from '../../common/components/alertModal';
import ComponentCalendar from '../../common/components/CalendarComponent';
import { openModal } from '../../dashboard/action';
import CalendarModal from '../../common/components/calendarModal';
import moment from 'moment';

class FacilityDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facility: {},
            loading: true,
            file: [],
            description: '',
            start_timestamp: '2022-03-16',
            end_timestamp: '2022-03-18',
            url: '',
            cost: '450.000',
            showAlertModal: false,
            alertMessage: '',
            step: 1,
            durationDays: 0,
            viewType: null,
            eventsShown: null,
        };
        this.buttonRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.facility !== this.props.facility) {
            this.setState({
                facility: this.props.facility,
            });
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.props.getFacilityClickedFunction(
            this.props.params.id.toString(),
            this.props.params.type,
        );
    }

    handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        this.setState((prevState) => ({
            file: [...prevState.file, ...files],
        }));
    };

    handleNavigateBack = () => {
        if (this.state.step === 1) {
            this.props.navigate('/booking/' + this.props.params.type);
        }
        if (this.state.step === 2) {
            this.setState({ step: 1 });
            document
                .querySelector('.calendar-component')
                .classList.remove('hidden');
            document
                .querySelector('.calendar-component')
                .classList.add('visible');
            document
                .querySelector('.container-booking-facility-detail__body')
                .classList.remove('visible');
            document
                .querySelector('.container-booking-facility-detail__body')
                .classList.add('hidden');
        }
    };

    handleFileSubmit = () => {
        if (
            this.state.file.length === 0 ||
            this.state.description === '' ||
            this.state.start_timestamp === '' ||
            this.state.end_timestamp === '' ||
            this.state.cost === '' ||
            this.state.url === ''
        ) {
            this.setState({
                showAlertModal: true,
                alertMessage: 'Isi semua form terlebih dahulu',
            });
        } else {
            const data = {
                facility_id: this.props.params.id,
                description: this.state.description,
                start_timestamp: this.state.start_timestamp,
                end_timestamp: this.state.end_timestamp,
                cost: this.state.cost,
                file: this.state.file,
                url: this.state.url,
            };
            this.props.postBookingStartFunction(data, 'vehicle');
            this.props.navigate('/booking/my');
        }
    };
    closeAlertModal = () => {
        this.setState({ showAlertModal: false, alertMessage: '' });
    };

    handleFileDelete = (index) => {
        const file = this.state.file;
        file.splice(index, 1);
        this.setState({ file: file });
    };

    handleDateClick = (arg, type, event) => {
        this.setState({ eventsShown: event });
        if (type === 'dayGridMonth') {
            this.setState({
                start_timestamp: arg.dateStr,
                viewType: type,
            });
            this.props.openModalFunction(arg.date);
        } else {
            this.setState({
                start_timestamp: arg.dateStr,
                viewType: type,
            });
            this.props.openModalFunction(arg.date);
        }
    };

    handleSubmitDate = (time, duration) => {
        if (this.state.viewType === 'dayGridMonth') {
            this.setState({
                start_timestamp: time,
            });
            const endTimestamp = moment(time)
                .add(duration, 'hours')
                .toISOString();

            const start = new Date(time);
            const end = new Date(endTimestamp);
            const eventsShown = this.state.eventsShown.filter(
                (event) => event.color === 'green',
            );

            const overlap = eventsShown.some((existingEvent) => {
                const existingStart = new Date(existingEvent.start);
                const existingEnd = new Date(existingEvent.end);
                return start < existingEnd && existingStart < end;
            });
            if (!overlap) {
                this.setState({
                    end_timestamp: endTimestamp,
                    durationDays: Math.ceil(duration / 24),
                    cost: this.state.facility.price * Math.ceil(duration / 24),
                });
                this.setState({ step: 2 });
                this.hideCalendar();
            } else {
                this.setState({
                    showAlertModal: true,
                    alertMessage:
                        'Terdapat Booking Yang Sudah Disetujui Pada Waktu Tersebut',
                });
            }
        } else {
            const endTimestamp = moment(this.state.start_timestamp)
                .add(duration, 'hours')
                .toISOString();

            const start = new Date(this.start_timestamp);
            const end = new Date(endTimestamp);

            const eventsShown = this.state.eventsShown.filter(
                (event) => event.color === 'green',
            );

            const overlap = eventsShown.some((existingEvent) => {
                const existingStart = new Date(existingEvent.start);
                const existingEnd = new Date(existingEvent.end);
                return start < existingEnd && existingStart < end;
            });
            if (!overlap) {
                this.setState({
                    end_timestamp: endTimestamp,
                    durationDays: Math.ceil(duration / 24),
                    cost: this.state.facility.price * Math.ceil(duration / 24),
                });
                this.setState({ step: 2 });
                this.hideCalendar();
            } else {
                this.setState({
                    showAlertModal: true,
                    alertMessage:
                        'Terdapat Booking Yang Sudah Disetujui Pada Waktu Tersebut',
                });
            }
        }
    };

    hideCalendar = () => {
        document
            .querySelector('.calendar-component')
            .classList.remove('visible');
        document.querySelector('.calendar-component').classList.add('hidden');
        document
            .querySelector('.container-booking-facility-detail__body')
            .classList.remove('hidden');
        document
            .querySelector('.container-booking-facility-detail__body')
            .classList.add('visible');
    };

    render() {
        if (this.state.loading) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-booking-facility">
                <div className="container-booking-facility__header">
                    <FontAwesomeIcon
                        icon={faTruck}
                        className="icon-booking-facility"
                    />
                    <h1>
                        Booking {this.props.params.type} /{' '}
                        {this.state.facility.name}
                    </h1>
                </div>
                <button className="back-btn" onClick={this.handleNavigateBack}>
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
                <ComponentCalendar
                    handleDateClick={this.handleDateClick}
                    facilityId={this.props.params.id}
                />
                <div className="container-booking-facility-detail__body">
                    <div className="facility-information">
                        <div className="facility__images">
                            <div className="facility__foto">
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
                                    {this.state.facility.image.length > 0 ? (
                                        this.state.facility.image.map(
                                            (image, index) => {
                                                return (
                                                    <SwiperSlide
                                                        key={index}
                                                        className="swiper-slide"
                                                    >
                                                        <div className="image-swiper">
                                                            <img
                                                                src={image}
                                                                alt="facility"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            },
                                        )
                                    ) : (
                                        <SwiperSlide className="swiper-slide">
                                            <h1>
                                                Belum ada foto untuk ditampilkan
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
                            <div className="header__information">
                                <h2>Informasi Fasilitas</h2>
                            </div>
                            <div className="detail-information">
                                <div className="information__section">
                                    <div className="description-item">
                                        <p className="tag">Tipe</p>
                                        <p>: {this.state.facility.type}</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Nama</p>
                                        <p>: {this.state.facility.name}</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Deskripsi</p>
                                        <p>
                                            : {this.state.facility.description}
                                        </p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">Nomor Polisi</p>
                                        <p>
                                            :{' '}
                                            {this.state.facility.license_number}
                                        </p>
                                    </div>
                                </div>
                                <div className="information__section">
                                    <div className="description-item">
                                        <p className="tag">
                                            Harga Sewa Per Hari
                                        </p>
                                        <p>: {this.state.facility.price}</p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">
                                            Kapasitas Kendaraan
                                        </p>
                                        <p>
                                            :{' '}
                                            {
                                                this.state.facility
                                                    .vehicle_capacity
                                            }
                                        </p>
                                    </div>
                                    <br />
                                    <div className="description-item">
                                        <p className="tag">
                                            Jenis SIM yang Dibutuhkan
                                        </p>
                                        <p>
                                            : {this.state.facility.sim_category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="facility__body">
                            <div className="booking-form">
                                <form>
                                    <label
                                        className="form-label"
                                        htmlFor="name"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nama
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder={this.props.user.name}
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        placeholder={this.props.user.email}
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="unitName"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Unit
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="unitName"
                                        placeholder={this.state.facility.name}
                                        disabled
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="phoneNumber"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Nomor Telepon Peminjam
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phoneNumber"
                                        placeholder="08123456789"
                                        onChange={(e) => {
                                            this.setState({
                                                phoneNumber: e.target.value,
                                            });
                                        }}
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="exampleFormControlTextarea1"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Catatan / Keterangan Tambahan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        placeholder="Masukkan deskripsi"
                                        onChange={(e) => {
                                            this.setState({
                                                description: e.target.value,
                                            });
                                        }}
                                    ></textarea>
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="exampleFormControlTextarea1"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        Lampiran Surat Izin Kegiatan
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            this.buttonRef.current.click();
                                        }}
                                    >
                                        Tambahkan File
                                    </button>
                                    <input
                                        className="input-file"
                                        type="file"
                                        accept=".pdf"
                                        id="profile-photo-file"
                                        onChange={this.handleFileUpload}
                                        ref={this.buttonRef}
                                        key={Date.now()}
                                        multiple
                                    />
                                    <div className="file-uploaded">
                                        {this.state.file &&
                                            this.state.file.map(
                                                (file, index) => (
                                                    <div
                                                        className="file-uploaded-item"
                                                        key={file.name}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        <p>{file.name}</p>
                                                        <div
                                                            style={{
                                                                margin: '10px',
                                                                marginLeft:
                                                                    'auto',
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                onClick={() =>
                                                                    this.handleFileDelete(
                                                                        index,
                                                                    )
                                                                }
                                                                className="icon-trash red"
                                                                style={{
                                                                    width: '15px',
                                                                    height: '15px',
                                                                    color: 'red',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                    </div>
                                    <br />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="url"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        URL / Link Surat e-office
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            this.setState({
                                                url: e.target.value,
                                            });
                                        }}
                                        className="form-control"
                                        type="text"
                                        name="url"
                                        placeholder="https://e-office/..."
                                    />
                                    <br />
                                </form>
                            </div>
                            <div className="booking__section__right">
                                <div className="booking-info">
                                    <h2 className="judul-harga">
                                        Detail Harga
                                    </h2>
                                    <div className="count-total">
                                        <div className="detail-total">
                                            <h2>
                                                Rp{this.state.facility.price} x{' '}
                                                {this.state.durationDays} hari
                                            </h2>
                                        </div>
                                        <div className="detail-total">
                                            <h1>Rp{this.state.cost}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="button__book">
                                    <button
                                        className="btn btn-primary"
                                        onClick={this.handleFileSubmit}
                                    >
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AlertModal
                        show={this.state.showAlertModal}
                        message={this.state.alertMessage}
                        closeModalFunction={this.closeAlertModal}
                    />
                </div>
                <CalendarModal
                    viewType={this.state.viewType}
                    handleSubmitDate={this.handleSubmitDate}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        facility: state.facility.facilityClicked,
        user: state.auth.user,
        calendarModalOpen: state.dashboard.calendarModalOpen,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getFacilityClickedFunction: (id, category) =>
            dispatch(getFacilityClicked(id, category)),
        postBookingStartFunction: (data, category) =>
            dispatch(postBookingStart(data, category)),
        openModalFunction: (selectedDate) => dispatch(openModal(selectedDate)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(FacilityDetail),
);
