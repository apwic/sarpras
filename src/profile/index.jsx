import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserCircle,
    faPencil,
    faSave,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import './style.css';
import { getUser } from '../common/auth/action';
import { editProfile, openModal } from './action';
import { getMyBookings } from '../mybooking/action';
import { getMyReports } from '../myreport/action';
import ProfilePictureCropperModal from '../common/components/imageModal';
import AlertModal from '../common/components/alertModal';
import LoadingScreen from '../common/components/loadingScreen';
import { findRoleName } from '../common/constants/roleConstant';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnEdit: false,
            showAlertModal: false,
            alertMessage: '',
            user: this.props.user
                ? {
                      ...this.props.user,
                      image: this.props.user.image,
                  }
                : {
                      name: '',
                      email: '',
                      role: '',
                      nim_nip: '',
                      image: '',
                      no_telp: '',
                  },
            no_telp: this.props.user ? this.props.user.no_telp : '',
            totalBookings: this.props.totalBookings,
        };
    }

    componentDidMount() {
        if (this.props.user === null) {
            this.props.getUserFunction();
        }
        this.props.getTotalBookingsFunction();
        this.props.getTotalReportsFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                user: {
                    ...this.props.user,
                    image: this.props.user.image,
                },
                no_telp: this.props.user.no_telp,
            });
        }
        if (prevProps.totalBookings !== this.props.totalBookings) {
            this.setState({
                totalBookings: this.props.totalBookings,
            });
        }
        if (prevProps.totalReports !== this.props.totalReports) {
            this.setState({
                totalReports: this.props.totalReports,
            });
        }
    }

    handleEditPhone = () => {
        const { isOnEdit } = this.state;
        if (
            isOnEdit &&
            this.state.no_telp !== '' &&
            this.state.no_telp !== null &&
            this.state.no_telp !== undefined &&
            this.state.no_telp !== this.state.user.no_telp
        ) {
            let data = {
                no_telp: this.state.no_telp,
            };
            this.props.editProfileFunction(data);
            this.setState({
                showAlertModal: true,
                alertMessage: 'Nomor telepon berhasil diubah!',
            });
        }
        document.getElementById('phone').disabled = isOnEdit;
        this.setState({ isOnEdit: !isOnEdit });
        document.getElementById('save-button').classList.toggle('hide');
        document.getElementById('edit-button').classList.toggle('hide');
    };

    handleEditImage = (data) => {
        this.props.editProfileFunction(data);
        this.setState({
            showAlertModal: true,
            alertMessage: 'Foto profil berhasil diubah!',
        });
    };

    handlePhoneChange = (event) => {
        this.setState({ no_telp: event.target.value });
    };

    handleImageChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        this.props.openModalFunction(url);
        document.getElementById('profile-photo-file').value = '';
    };

    closeAlertModal = () => {
        this.setState({ showAlertModal: false, alertMessage: '' });
    };

    render() {
        let role = this.state.user.role;
        let emailValue = this.state.user.email;
        let phoneValue = this.state.no_telp;

        if (
            this.state.user.name === '' ||
            this.state.totalBookings === undefined
        ) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-profile">
                <div className="container-profile__header">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="icon-profile"
                    />
                    <h1>Profil</h1>
                </div>
                <div className="container-profile__body">
                    <div className="container-profile__body__header">
                        <div className="profile-photo">
                            <div
                                className="profile-photo-circle"
                                style={{
                                    backgroundImage:
                                        'url(' +
                                        (this.state.user.image
                                            ? this.state.user.image
                                            : 'https://www.w3schools.com/howto/img_avatar.png') +
                                        ')',
                                }}
                            >
                                <label
                                    htmlFor="profile-photo-file"
                                    className="profile-photo-label"
                                >
                                    Ganti Foto
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="profile-photo-file"
                                    onChange={this.handleImageChange}
                                />
                            </div>
                        </div>
                        <div className="profile-details">
                            <h2>{this.state.user.name}</h2>
                            <p>{findRoleName(role)}</p>
                            <p>{this.state.user.nim_nip}</p>
                        </div>
                        <div className="total-container">
                            <div className="total-box">
                                <div className="total-text">PEMINJAMAN</div>
                                <div className="total-number">
                                    {this.state.totalBookings}
                                </div>
                            </div>
                            <div className="total-box">
                                <div className="total-text">KELUHAN</div>
                                <div className="total-number">
                                    {this.state.totalReports}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-profile__body__content">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            value={emailValue}
                                            disabled
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Telepon</th>
                                    <td>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            value={phoneValue}
                                            onChange={this.handlePhoneChange}
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
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProfilePictureCropperModal
                    donefunction={this.handleEditImage}
                />
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
        user: state.auth.user,
        totalBookings: state.myBooking.totalBookings,
        totalReports: state.myReport.totalReports,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserFunction: () => dispatch(getUser()),
        openModalFunction: (imgUrl) => dispatch(openModal(imgUrl)),
        editProfileFunction: (user) => dispatch(editProfile(user)),
        getTotalBookingsFunction: () => dispatch(getMyBookings(1, 5, '', '')),
        getTotalReportsFunction: () => dispatch(getMyReports()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
