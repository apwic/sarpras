import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faCheck,
    faPencil,
    faSave,
    faClose,
    faBookOpen,
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
            isOnEdit: false,
            showAlertModal: false,
            alertMessage: '',
            facilities: null,
            editFacilityDropdown: false,
            selectedGedung: 'Gedung Sate',
        };
    }

    handleEditPhone = () => {
        const { isOnEdit } = this.state;
        console.log(this.state.cost);
        document.getElementById('phone').disabled = isOnEdit;
        this.setState({ isOnEdit: !isOnEdit });
        document.getElementById('save-button').classList.toggle('hide');
        document.getElementById('edit-button').classList.toggle('hide');
    };

    componentDidMount() {
        this.props.getBookingFunction(this.props.params.id);
    }

    componentDidUpdate(prevProps) {
        console.log(this.props);
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
        this.setState({ selectedEditStatus: item });
        this.setState({ bookingStatus: bookingStatusConstant[item.name] });
    };

    handleEditFacilityClicked = (item) => {
        this.setState({ selectedGedung: item });
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
        if (this.state.booking === null && this.state.facilities === null) {
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
                                <button
                                    className="btn btn-primary btn-insertfacility"
                                    onClick={this.handleSubmit}
                                    disabled={
                                        this.state.bookingStatus.name ===
                                            this.state.booking.status &&
                                        this.state.cost ===
                                            this.state.booking.cost &&
                                        this.state.selectedGedung.id ===
                                            this.state.booking.facility.id
                                    }
                                >
                                    Simpan Perubahan
                                </button>
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
                        <BookingStatusLabel status={this.state.bookingStatus} />
                    </div>
                    <div className="editable-booking__item">
                        <h2>Harga Tambahan</h2>
                        <div>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                value={cost}
                                onChange={(e) => {
                                    this.setState({
                                        cost: parseInt(e.target.value),
                                    });
                                }}
                                disabled
                            />
                            <FontAwesomeIcon
                                icon={faPencil}
                                className="icon-pencil"
                                id="edit-button"
                                onClick={this.handleEditPhone}
                            />
                            <FontAwesomeIcon
                                icon={faSave}
                                className="icon-save hide"
                                id="save-button"
                                onClick={this.handleEditPhone}
                            />
                        </div>
                    </div>
                    <div className="editable-booking__item">
                        <div className="header-editable-status">
                            <h2>Fasilitas</h2>
                            <p onClick={this.editFacilityDropdown}>Edit</p>
                        </div>
                        <p>{this.state.selectedGedung.name}</p>
                    </div>
                </div>
                <div
                    className={`edit-status-dropdown ${
                        !editStatus ? 'hide' : ''
                    }`}
                >
                    <div className="modal-edit-status-header">
                        <FontAwesomeIcon
                            icon={faClose}
                            className="icon-close"
                            onClick={this.editStatusDropdown}
                        />
                        <h2>Edit Status</h2>
                    </div>
                    <ul>
                        {Object.values(bookingStatusConstant).map(
                            (item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`${
                                            selectedStatus.name === item.name
                                                ? 'selected-status-management-booking'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            this.handleEditStatusClicked(item)
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
                            },
                        )}
                    </ul>
                </div>
                <div
                    className={`edit-facility-dropdown ${
                        !editFacilityDropdown ? 'hide' : ''
                    }`}
                >
                    <div className="modal-edit-status-header">
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
                                            ? 'selected-status-management-booking'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        this.handleEditFacilityClicked(item)
                                    }
                                >
                                    <div className="checked-logo">
                                        {selectedFacility.id === item.id && (
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
                        {/* <li
                            className={`${
                                selectedStatus === 'Pending'
                                    ? 'selected-status-management-booking'
                                    : ''
                            }`}
                            onClick={() =>
                                this.handleEditStatusCLicked('Pending')
                            }
                        >
                            <div className="checked-logo">
                                {selectedStatus === 'Pending' && (
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
                            <p>Pending</p>
                        </li>
                        <li
                            className={`${
                                selectedStatus === 'Approved'
                                    ? 'selected-status-management-booking'
                                    : ''
                            }`}
                            onClick={() =>
                                this.handleEditStatusCLicked('Approved')
                            }
                        >
                            <div className="checked-logo">
                                {selectedStatus === 'Approved' && (
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
                            <p>Approved</p>
                        </li> */}
                    </ul>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingFunction: (id) => dispatch(getBooking(id)),
        editBookingFunction: (id, facilityId, cost, status) =>
            dispatch(editBooking(id, facilityId, cost, status)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingManagementDetail),
);
