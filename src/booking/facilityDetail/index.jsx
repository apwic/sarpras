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
import LoadingOverlay from '../../common/components/loadingOverlay';

class FacilityDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            facility: {},
            loading: true,
            file: [],
            unit: '',
            description: '',
            start_timestamp: null,
            end_timestamp: null,
            url: '',
            cost: '450.000',
            showAlertModal: false,
            alertMessage: '',
            step: 1,
            durationDays: 0,
            viewType: null,
            eventsShown: null,
            phoneNumber: '',
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
        if (prevProps.newBookingMessage !== this.props.newBookingMessage) {
            if (this.props.newBookingMessage.message) {
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.newBookingMessage.message,
                });
                clearInterval(this.intervalId);
                this.intervalId = setInterval(() => {
                    this.props.navigate('/booking/my');
                    clearInterval(this.intervalId);
                }, 1000);
            } else if (this.props.newBookingMessage.error_message) {
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.newBookingMessage.error_message,
                });
            }
            document.querySelector('.loading-overlay').classList.remove('show');
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
                .querySelector('.container-booking-facility-detail__body')
                .classList.remove('visible');
        }
    };

    handleFileSubmit = () => {
        if (
            this.state.unit === '' ||
            this.state.file.length === 0 ||
            this.state.description === '' ||
            this.state.start_timestamp === null ||
            this.state.end_timestamp === null ||
            this.state.cost === '' ||
            this.state.url === '' ||
            this.state.phoneNumber === ''
        ) {
            this.setState({
                showAlertModal: true,
                alertMessage: 'Isi semua form terlebih dahulu',
            });
            if (this.state.unit === '') {
                document.querySelector('#booking-unit').classList.add('error');
            }
            if (this.state.file.length === 0) {
                document
                    .querySelector('#booking-file-button')
                    .classList.add('error');
            }
            if (this.state.phoneNumber === '') {
                document.querySelector('#booking-phone').classList.add('error');
            }
            if (this.state.description === '') {
                document
                    .querySelector('#booking-description')
                    .classList.add('error');
            }
            if (this.state.url === '') {
                document.querySelector('#booking-url').classList.add('error');
            }
        } else {
            const data = {
                facility_id: this.props.params.id,
                description: this.state.description,
                start_timestamp: this.state.start_timestamp.toISOString(),
                end_timestamp: this.state.end_timestamp.toISOString(),
                unit: this.state.unit,
                file: this.state.file,
                url: this.state.url,
            };
            this.props.postBookingStartFunction(data, this.props.params.type);
            document.querySelector('.loading-overlay').classList.add('show');
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
        if (arg.date < new Date()) {
            this.setState({
                showAlertModal: true,
                alertMessage: 'Tidak Bisa Memilih Tanggal Sebelum Hari Ini',
            });
            return;
        }
        this.setState({
            eventsShown: event,
            start_timestamp: arg.date,
            viewType: type,
        });
        this.props.openModalFunction(arg.date);
    };

    handleSubmitDate = (time, duration) => {
        var overlap;
        var endTimestamp;
        if (this.state.viewType === 'dayGridMonth') {
            this.setState({
                start_timestamp: time,
            });

            endTimestamp = new Date(time);
            endTimestamp.setHours(endTimestamp.getHours() + duration);

            const eventsShown = this.state.eventsShown.filter(
                (event) => event.color === 'green',
            );

            overlap = eventsShown.some((existingEvent) => {
                const existingStart = new Date(existingEvent.start);
                const existingEnd = new Date(existingEvent.end);
                return time < existingEnd && existingStart < endTimestamp;
            });
        } else {
            endTimestamp = new Date(this.state.start_timestamp);
            endTimestamp.setHours(endTimestamp.getHours() + duration);

            const eventsShown = this.state.eventsShown.filter(
                (event) => event.color === 'green',
            );

            overlap = eventsShown.some((existingEvent) => {
                const existingStart = new Date(existingEvent.start);
                const existingEnd = new Date(existingEvent.end);
                return (
                    this.state.start_timestamp < existingEnd &&
                    existingStart < endTimestamp
                );
            });
        }
        if (!overlap) {
            const startDay = new Date(time);
            const endDay = new Date(endTimestamp);
            startDay.setHours(0, 0, 0, 0);
            endDay.setHours(0, 0, 0, 0);
            const timeDiff = endDay.getTime() - startDay.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
            this.setState({
                end_timestamp: endTimestamp,
                durationDays: daysDiff,
                cost: this.state.facility.price * daysDiff,
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
                <LoadingOverlay />
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
                                    {this.state.facility.category ===
                                        'ROOM' && (
                                        <div>
                                            <div className="description-item">
                                                <p className="tag">
                                                    Kode Ruangan:
                                                </p>
                                                <p>
                                                    :{' '}
                                                    {
                                                        this.state.facility
                                                            .room_code
                                                    }
                                                </p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
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
                                    {this.state.facility.category ===
                                        'VEHICLE' && (
                                        <div>
                                            <div className="description-item">
                                                <p className="tag">Tipe</p>
                                                <p>
                                                    : {this.state.facility.type}
                                                </p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                    {this.state.facility.category ===
                                        'VEHICLE' && (
                                        <div>
                                            <div className="description-item">
                                                <p className="tag">
                                                    Nomor Polisi
                                                </p>
                                                <p>
                                                    :{' '}
                                                    {
                                                        this.state.facility
                                                            .license_number
                                                    }
                                                </p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                    {(this.state.facility.category === 'ROOM' ||
                                        this.state.facility.category ===
                                            'SELASAR') && (
                                        <div>
                                            <div className="description-item">
                                                <p className="tag">
                                                    Lokasi Gedung:
                                                </p>
                                                <p>
                                                    :{' '}
                                                    {
                                                        this.state.facility
                                                            .building.name
                                                    }
                                                </p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                </div>
                                <div className="information__section">
                                    <div className="description-item">
                                        <p className="tag">
                                            Harga Sewa Per Hari
                                        </p>
                                        <p>: {this.state.facility.price}</p>
                                    </div>
                                    <br />
                                    {this.state.facility.category ===
                                        'VEHICLE' && (
                                        <div>
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
                                                    :{' '}
                                                    {
                                                        this.state.facility
                                                            .sim_category
                                                    }
                                                </p>
                                            </div>
                                            <br />
                                        </div>
                                    )}
                                    <div className="description-item">
                                        <p className="tag">Lokasi Kampus</p>
                                        <p>
                                            : {this.state.facility.campus.name}
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
                                        id="booking-name"
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
                                        id="booking-email"
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
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="unitName"
                                        id="booking-unit"
                                        placeholder="Masukkan unit anda"
                                        value={this.state.unit}
                                        onChange={(e) => {
                                            this.setState({
                                                unit: e.target.value,
                                            });
                                        }}
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
                                        Nomor Telepon Penanggung Jawab
                                        <p style={{ color: 'red' }}>*</p>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phoneNumber"
                                        id="booking-phone"
                                        placeholder="Masukkan nomor telepon penanggung jawab"
                                        onChange={(e) => {
                                            this.setState({
                                                phoneNumber: e.target.value,
                                            });
                                        }}
                                    />
                                    <br />
                                    <label
                                        className="form-label"
                                        htmlFor="booking-description"
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
                                        id="booking-description"
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
                                        id="booking-file-button"
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
                                    {this.state.file && (
                                        <div className="file-uploaded">
                                            {this.state.file.map(
                                                (file, index) => (
                                                    <div
                                                        className="file-uploaded-item"
                                                        key={file.name}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                        onClick={() => {
                                                            window.open(
                                                                URL.createObjectURL(
                                                                    file,
                                                                ),
                                                                '_blank',
                                                            );
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
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    this.handleFileDelete(
                                                                        index,
                                                                    );
                                                                }}
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
                                    )}
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
                                        id="booking-url"
                                        placeholder="https://e-office/..."
                                    />
                                    <br />
                                </form>
                            </div>
                            <div className="booking__section__right">
                                <div className="booking-info">
                                    <div>
                                        <div className="description-item">
                                            <p className="tag">Waktu Mulai</p>
                                            <p>
                                                {this.state.start_timestamp
                                                    ? this.state.start_timestamp.toLocaleString(
                                                          'id-ID',
                                                      )
                                                    : ''}
                                                {' WIB'}
                                            </p>
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <div className="description-item">
                                            <p className="tag">Waktu Selesai</p>
                                            <p>
                                                {this.state.end_timestamp
                                                    ? this.state.end_timestamp.toLocaleString(
                                                          'id-ID',
                                                      )
                                                    : ''}
                                                {' WIB'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="booking-price-info">
                                        <h2 className="judul-harga">
                                            Detail Harga
                                        </h2>
                                        <div className="count-total">
                                            <div className="detail-total">
                                                <p>
                                                    Rp
                                                    {
                                                        this.state.facility
                                                            .price
                                                    }{' '}
                                                    x {this.state.durationDays}{' '}
                                                    hari
                                                </p>
                                            </div>
                                            <div className="detail-total">
                                                <h2>: Rp{this.state.cost}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="button__book__finalize">
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
        newBookingMessage: state.facility.new_booking_message,
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
