import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faCheck,
    faSave,
    faClose,
    faBookOpen,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import './style.css';
import { withRouter } from '../../../common/withRouter';
import { connect } from 'react-redux';
import bookingStatusConstant from '../../../common/constants/bookingStatusConstant';
import BookingStatusLabel from '../../../common/components/labels/bookingStatusLabel';
import AlertModal from '../../../common/components/alertModal';
import { getBooking, editBooking } from '../action';
import facilityTypeConstant from '../../../common/constants/facilityTypeConstant';
import LoadingScreen from '../../../common/components/loadingScreen';

class BookingManagementDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: null,
            selectedEditStatus: 'Pending',
            loading: true,
            editStatusDropdown: false,
            bookingStatus: null,
            cost: 0,
            showAlertModal: false,
            alertMessage: '',
            facilities: null,
            editFacilityDropdown: false,
            selectedGedung: 'Gedung Sate',
            editCost: false,
        };
    }

    handleEditPhone = () => {
        if (this.state.cost !== this.state.booking.cost) {
            let data;
            if (
                this.state.cost === '' ||
                this.state.cost === null ||
                this.state.cost === undefined ||
                isNaN(parseInt(this.state.cost))
            ) {
                data = {
                    status: this.state.booking.status,
                    cost: 0,
                };
            } else {
                data = {
                    status: this.state.booking.status,
                    cost: parseInt(this.state.cost),
                };
            }
            this.setState({ loading: true, editCost: false });
            this.props.editBookingFunction(this.props.params.id, data);
        }
        this.setState({ editCost: false });
        document.getElementById('save-button').classList.toggle('hide');
    };

    componentDidMount() {
        this.props.getBookingFunction(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.booking !== this.props.booking) {
            this.setState({
                booking: this.props.booking,
                bookingStatus: bookingStatusConstant[this.props.booking.status],
                cost: this.props.booking.cost,
                selectedGedung: this.props.booking.facility,
                facilities: this.props.facilities,
                selectedEditStatus:
                    bookingStatusConstant[this.props.booking.status],
                loading: false,
            });
        }
        if (prevProps.facilities !== this.props.facilities) {
            this.setState({ facilities: this.props.facilities });
        }
        if (prevProps.message !== this.props.message) {
            if (this.props.message && this.props.message.message) {
                this.setState({
                    showAlertModal: true,
                    alertMessage: 'Booking berhasil diubah!',
                });
            } else if (this.props.message && this.props.message.error_message) {
                this.setState({
                    showAlertModal: true,
                    alertMessage: this.props.message.error_message,
                });
            }
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/manage/booking');
    };

    getDuration = (startDate, endDate) => {
        let diffTime = new Date(endDate) - new Date(startDate);
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        let diffMinutes = Math.floor(diffTime / (1000 * 60));
        let duration = '';
        if (diffDays > 0) {
            duration += diffDays + ' hari ';
        } else if (diffHours > 0) {
            duration += diffHours + ' jam ';
        } else if (diffMinutes > 0) {
            duration += diffMinutes + ' menit ';
        } else {
            return '0 menit';
        }
        return duration.trim();
    };

    handleEditStatusClicked = (item) => {
        this.setState({ editStatusDropdown: false });
        const data = {
            status: item.name,
        };
        if (item.name !== this.state.booking.status) {
            this.setState({ loading: true });
            this.props.editBookingFunction(this.props.params.id, data);
        }
    };

    handleEditFacilityClicked = (item) => {
        this.setState({ editFacilityDropdown: false });
        const data = {
            status: this.state.booking.status,
            facility_id: item.id,
        };
        if (item.id !== this.state.booking.facility.id) {
            this.setState({ loading: true });
            this.props.editBookingFunction(this.props.params.id, data);
        }
    };

    editStatusDropdown = () => {
        this.setState({
            editStatusDropdown: !this.state.editStatusDropdown,
            editFacilityDropdown: false,
        });
    };
    editFacilityDropdown = () => {
        this.setState({
            editFacilityDropdown: !this.state.editFacilityDropdown,
            editStatusDropdown: false,
        });
    };

    closeAlertModal = () => {
        this.setState({ showAlertModal: false });
    };

    handleEditCost = () => {
        this.setState({ editCost: !this.state.editCost });
    };

    handleSubmit = () => {
        this.props.editBookingFunction(
            this.props.params.id,
            this.state.selectedGedung.id.toString(),
            this.state.cost.toString(),
            this.state.selectedEditStatus.name,
        );
        this.props.navigate('/manage/booking');
    };

    render() {
        let editStatus = this.state.editStatusDropdown;
        let selectedStatus = this.state.selectedEditStatus;
        let cost = this.state.cost;
        let editFacilityDropdown = this.state.editFacilityDropdown;
        let selectedFacility = this.state.selectedGedung;
        if (
            (this.state.booking === null && this.state.facilities === null) ||
            this.state.loading
        ) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-management-all">
                <div className="container-bookingManagement-detail">
                    <div className="container-bookingManagement-detail__header">
                        <FontAwesomeIcon
                            icon={faBookOpen}
                            className="icon-bookingManagement-detail"
                        />
                        <h1>
                            Manajemen Peminjaman /{' '}
                            {this.state.booking.facility.name}
                        </h1>
                    </div>
                    <div className="container-bookingManagement-detail__body">
                        <div className="container-bookingManagement-button-back">
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
                        <div className="container-bookingManagement-detail__body__item">
                            <div className="item-container">
                                <h3 className="item-title">
                                    Rincian Peminjaman
                                </h3>
                                <div className="item-detail">
                                    <table>
                                        <tbody>
                                            <tr>
                                                {this.state.booking.category ===
                                                    facilityTypeConstant
                                                        .BUILDING.name && (
                                                    <td className="item-detail__label">
                                                        Gedung
                                                    </td>
                                                )}
                                                {this.state.booking.category ===
                                                    facilityTypeConstant.ROOM
                                                        .name && (
                                                    <td className="item-detail__label">
                                                        Ruangan
                                                    </td>
                                                )}
                                                {this.state.booking.category ===
                                                    facilityTypeConstant.SELASAR
                                                        .name && (
                                                    <td className="item-detail__label">
                                                        Selasar
                                                    </td>
                                                )}
                                                {this.state.booking.category ===
                                                    facilityTypeConstant.VEHICLE
                                                        .name && (
                                                    <td className="item-detail__label">
                                                        Kendaraan
                                                    </td>
                                                )}
                                                <td className="item-detail__value">
                                                    {this.state.booking.facility
                                                        ? this.state.booking
                                                              .facility.name
                                                        : '-'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="item-detail__label">
                                                    Nama
                                                </td>
                                                <td className="item-detail__value">
                                                    {
                                                        this.state.booking.user
                                                            .name
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="item-detail__label">
                                                    Waktu Sewa
                                                </td>
                                                <td className="item-detail__value">
                                                    {new Date(
                                                        this.state.booking.start_timestamp,
                                                    ).toLocaleString(
                                                        'id-ID',
                                                    )}{' '}
                                                    -{' '}
                                                    {new Date(
                                                        this.state.booking.end_timestamp,
                                                    ).toLocaleString('id-ID')}
                                                </td>
                                            </tr>
                                            {this.state.booking.category ===
                                                facilityTypeConstant.VEHICLE
                                                    .name && (
                                                <tr>
                                                    <td className="item-detail__label">
                                                        Plat Nomor
                                                    </td>
                                                    <td className="item-detail__value">
                                                        {this.state.booking
                                                            .facility
                                                            ? this.state.booking
                                                                  .facility
                                                                  .license_number
                                                            : '-'}
                                                    </td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td className="item-detail__label">
                                                    Durasi
                                                </td>
                                                <td className="item-detail__value">
                                                    {this.getDuration(
                                                        new Date(
                                                            this.state.booking.start_timestamp,
                                                        ),
                                                        new Date(
                                                            this.state.booking.end_timestamp,
                                                        ),
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="item-detail__label">
                                                    Link Surat
                                                </td>
                                                <td className="item-detail__value">
                                                    <a
                                                        href={
                                                            this.state.booking
                                                                .url
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            color: 'blue',
                                                            textDecoration:
                                                                'underline',
                                                        }}
                                                    >
                                                        Klik di sini
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="item-detail__label">
                                                    Status
                                                </td>
                                                <td className="item-detail__value">
                                                    <BookingStatusLabel
                                                        status={
                                                            bookingStatusConstant[
                                                                this.state
                                                                    .booking
                                                                    .status
                                                            ]
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="total-price">
                                    <h3 className="total-price__label">
                                        Total Biaya
                                    </h3>
                                    <h3 className="total-price__value">
                                        Rp{this.state.booking.total_price}
                                    </h3>
                                </div>
                            </div>
                            <div className="item-container-right">
                                <div className="item-container-description">
                                    <h3 className="item-title">Deskripsi</h3>
                                    <div className="booking-description">
                                        <p>{this.state.booking.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editable-booking">
                    <div className="editable-booking__item">
                        <div className="header-editable-status">
                            <h2>Status</h2>
                            <p
                                className="clickable-edit"
                                onClick={this.editStatusDropdown}
                            >
                                Edit
                            </p>
                        </div>
                        <div
                            className={`edit-dropdown ${
                                !editStatus ? 'hide' : ''
                            }`}
                        >
                            <div className="modal-edit-header">
                                <FontAwesomeIcon
                                    icon={faClose}
                                    className="icon-close"
                                    onClick={this.editStatusDropdown}
                                />
                                <h2>Edit Status</h2>
                            </div>
                            <ul>
                                {Object.values(bookingStatusConstant)
                                    .filter((item) => {
                                        return (
                                            item !==
                                                bookingStatusConstant.WAITING_FOR_RATING &&
                                            item !== bookingStatusConstant.DONE
                                        );
                                    })
                                    .map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={`${
                                                    selectedStatus.name ===
                                                    item.name
                                                        ? 'selected-management-booking'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    this.handleEditStatusClicked(
                                                        item,
                                                    )
                                                }
                                            >
                                                <div className="checked-logo">
                                                    {selectedStatus.name ===
                                                        item.name && (
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="icon-check"
                                                        />
                                                    )}
                                                </div>
                                                <div className="status-name">
                                                    {item.value}
                                                </div>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <BookingStatusLabel status={this.state.bookingStatus} />
                    </div>
                    <div className="editable-booking__item">
                        <div className="header-editable-status">
                            <h2>Harga Tambahan</h2>
                            {this.state.editCost ? (
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="clickable-edit"
                                    onClick={this.handleEditCost}
                                />
                            ) : (
                                <p
                                    className="clickable-edit"
                                    onClick={this.handleEditCost}
                                >
                                    Edit
                                </p>
                            )}
                        </div>
                        <div>
                            {this.state.editCost ? (
                                <>
                                    <input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        value={cost}
                                        onChange={(e) => {
                                            this.setState({
                                                cost: e.target.value,
                                            });
                                        }}
                                    />
                                    {this.state.booking.cost !==
                                    this.state.cost ? (
                                        <FontAwesomeIcon
                                            icon={faSave}
                                            className="icon-save"
                                            id="save-button"
                                            onClick={this.handleEditPhone}
                                        />
                                    ) : null}
                                </>
                            ) : (
                                <p>Rp{this.state.booking.cost}</p>
                            )}
                        </div>
                    </div>
                    <div className="editable-booking__item">
                        <div className="header-editable-status">
                            <h2>Fasilitas</h2>
                            <p onClick={this.editFacilityDropdown}>Edit</p>
                        </div>
                        <div
                            className={`edit-dropdown ${
                                !editFacilityDropdown ? 'hide' : ''
                            }`}
                        >
                            <div className="modal-edit-header">
                                <FontAwesomeIcon
                                    icon={faClose}
                                    className="icon-close"
                                    onClick={this.editFacilityDropdown}
                                />
                                <h2>Edit Fasilitas</h2>
                            </div>
                            <ul>
                                {this.state.facilities.map((item, id) => {
                                    return (
                                        <li
                                            key={id}
                                            className={`${
                                                selectedFacility.id === item.id
                                                    ? 'selected-management-booking'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                this.handleEditFacilityClicked(
                                                    item,
                                                )
                                            }
                                        >
                                            <div className="checked-logo">
                                                {selectedFacility.id ===
                                                    item.id && (
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className="icon-back"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <p>{item.name}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <p>{this.state.selectedGedung.name}</p>
                    </div>
                </div>
                <AlertModal
                    show={this.state.showAlertModal}
                    message={this.state.alertMessage}
                    closeModalFunction={this.closeAlertModal}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        booking: state.bookingManagement.booking,
        facilities: state.bookingManagement.facilities,
        message: state.bookingManagement.responseMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingFunction: (id) => dispatch(getBooking(id)),
        editBookingFunction: (id, data) => dispatch(editBooking(id, data)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingManagementDetail),
);
