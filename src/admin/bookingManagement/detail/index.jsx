import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
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
import { getBooking } from '../action';
import facilityTypeConstant from '../../../common/constants/facilityTypeConstant';

class BookingManagementDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking: {
                attachment: [
                    'https://storage.googleapis.com/sarpras/document/bo…g-48/cbb0fd0ba7d111b126f74526678f30d094c3cb5e.pdf',
                ],
                category: 'BUILDING',
                cost: 1000,
                createdAt: '2023-03-30T11:46:18.572Z',
                description: 'Ngabuburit',
                end_timestamp: '2023-04-05T13:00:00.000Z',
                facility: {
                    id: 74,
                    name: 'Gedung Sate',
                    description: 'Bukan gedung ITB',
                },
                facility_id: 74,
                id: 48,
                letter: null,
                payment_id: null,
                rekening_va: null,
                start_timestamp: '2023-04-05T10:00:00.000Z',
                status: 'PENDING',
                updatedAt: '2023-03-30T11:46:18.915Z',
                url: '23232323',
                user_id: 1,
                verifier_id: null,
            },
            selectedEditStatus: 'Pending',
            loading: true,
            editStatusDropdown: false,
            bookingStatus: bookingStatusConstant.PENDING,
            cost: 0,
            isOnEdit: false,
            showAlertModal: false,
            alertMessage: '',
            gedung: ['Gedung Sate', 'Gedung Tinggi', 'Gedung Gudang'],
            editFacilityDropdown: false,
            selectedGedung: 'Gedung Sate',
        };
    }

    handleEditPhone = () => {
        const { isOnEdit } = this.state;
        if (
            isOnEdit &&
            this.state.cost !== '' &&
            this.state.cost !== undefined &&
            this.state.cost !== null
        ) {
            this.setState({
                showAlertModal: true,
                alertMessage: 'Harga berhasil diubah!',
            });
        }
        document.getElementById('phone').disabled = isOnEdit;
        this.setState({ isOnEdit: !isOnEdit });
        document.getElementById('save-button').classList.toggle('hide');
        document.getElementById('edit-button').classList.toggle('hide');
    };

    componentDidMount() {
        this.props.getBookingFunction(this.props.params.id.toString());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.bookingManagement !== this.props.bookingManagement) {
            this.setState({
                bookingManagement: this.props.bookingManagement,
            });
            this.setState({ loading: false });
        }
    }

    handleNavigateBack = () => {
        this.props.navigate('/booking/my');
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

    handleEditStatusCLicked = (item) => {
        this.setState({ selectedEditStatus: item });
        if (item === 'Pending') {
            this.setState({ bookingStatus: bookingStatusConstant.PENDING });
        }
        if (item === 'Approved') {
            this.setState({ bookingStatus: bookingStatusConstant.APPROVED });
        }
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

    render() {
        let editStatus = this.state.editStatusDropdown;
        let selectedStatus = this.state.selectedEditStatus;
        let cost = this.state.cost;
        let editFacilityDropdown = this.state.editFacilityDropdown;
        let selectedFacility = this.state.selectedGedung;
        return (
            <div className="container-management-all">
                <div className="container-bookingManagement-detail">
                    <div className="container-bookingManagement-detail__header">
                        <FontAwesomeIcon
                            icon={faBookOpen}
                            className="icon-bookingManagement-detail"
                        />
                        <h1>Manajemen Peminjaman / </h1>
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
                                                    {/* {this.props.user.name} */}
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
                                                        {this.state.booking.url}
                                                    </a>
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
                                        Rp{this.state.booking.cost}
                                    </h3>
                                </div>
                            </div>
                            <div className="item-container">
                                <h3 className="item-title">Deskripsi</h3>
                                <div className="booking-description">
                                    <p>{this.state.booking.description}</p>
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
                        <BookingStatusLabel status={this.state.bookingStatus} />
                    </div>
                    <div className="editable-booking__item">
                        <h2>Harga</h2>
                        <div>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                value={cost}
                                onChange={(e) => {
                                    this.setState({ cost: e.target.value });
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
                        <p>{this.state.selectedGedung}</p>
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
                        <li
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
                        </li>
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
                        {this.state.gedung.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`${
                                        selectedFacility === item
                                            ? 'selected-status-management-booking'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        this.handleEditFacilityClicked(item)
                                    }
                                >
                                    <div className="checked-logo">
                                        {selectedFacility === item && (
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
                                    <p>{item}</p>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBookingFunction: (id) => dispatch(getBooking(id)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingManagementDetail),
);
