import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import "./style.css"
import { getUser } from '../common/auth/action';
import { editProfile, openModal } from './action';
import ProfilePictureCropperModal from '../common/components/imageModal';
import AlertModal from '../common/components/alertModal';
import LoadingScreen from '../common/components/loadingScreen';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnEdit: false,
            showAlertModal: false,
            alertMessage: '',
            user: {
                name: '',
                nim_nip: '',
                email: '',
                no_telp: '',
                image: ''
            },
            no_telp: ''
        }
    }

    componentDidMount() {
        this.props.getUserFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ 
                user: {
                    ...this.props.user,
                    image: import.meta.env.VITE_REST_API_URL + '/uploads/' + this.props.user.image
                },
                no_telp: this.props.user.no_telp
            });
        }
    }

    handleEditPhone = () => {
        const { isOnEdit } = this.state;
        if (isOnEdit && this.state.no_telp !== '' && this.state.no_telp !== null && this.state.no_telp !== undefined && this.state.no_telp !== this.state.user.no_telp) {
            let formData = new FormData();
            formData.append('no_telp', this.state.no_telp);
            this.props.editProfileFunction(formData);
            this.setState({showAlertModal: true, alertMessage: 'Nomor telepon berhasil diubah!'});
        }
        document.getElementById('phone').disabled = isOnEdit;
        this.setState({ isOnEdit: !isOnEdit });
        document.getElementById('save-button').classList.toggle('hide');
        document.getElementById('edit-button').classList.toggle('hide');
    }

    handleEditImage = (formData) => {
        this.props.editProfileFunction(formData);
        this.setState({showAlertModal: true, alertMessage: 'Foto profil berhasil diubah!'});
    }

    handlePhoneChange = (event) => {
        this.setState({ no_telp: event.target.value });
    }

    handleImageChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        this.props.openModalFunction(url);
        document.getElementById('profile-photo-file').value = '';
    }

    closeAlertModal = () => {
        this.setState({showAlertModal: false, alertMessage: ''});
    }

    render() {
        let role = this.state.user.role;
        let emailValue = this.state.user.email;
        let phoneValue = this.state.no_telp;

        if (this.state.user.name === '') {
            return (
                <LoadingScreen/>
            );
        }
        return (
            <div className='container-profile'>
                <div className='container-profile__header'>
                    <FontAwesomeIcon icon={faUserCircle} className="icon-profile"/>
                    <h1>Profil</h1>
                </div>
                <div className='container-profile__body'>
                    <div className="container-profile__body__header">
                        <div className="profile-photo">
                            <div className='profile-photo-circle' style={{"backgroundImage": "url(" + (this.state.user.image ? this.state.user.image : 'https://www.w3schools.com/howto/img_avatar.png') + ")"}}>
                                <label htmlFor="profile-photo-file" className="profile-photo-label">Ganti Foto</label>
                                <input type="file" accept="image/*" id="profile-photo-file" onChange={this.handleImageChange}/>
                            </div>
                        </div>
                        <div className="profile-details">
                            <h2>{this.state.user.name}</h2>
                            <p>{role}</p>
                            <p>{this.state.user.nim_nip}</p>
                        </div>
                        <div className="total-container">
                            <div className="total-box">
                                <div className="total-text">PEMINJAMAN</div>
                                <div className="total-number">0</div>
                            </div>
                            <div className="total-box">
                                <div className="total-text">KELUHAN</div>
                                <div className="total-number">0</div>
                            </div>
                        </div>
                    </div>
                    <div className="container-profile__body__content">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <input type="text" name="email" id="email" value={emailValue} disabled/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Telepon</th>
                                    <td>
                                        <input type="text" name="phone" id="phone" value={phoneValue} onChange={this.handlePhoneChange} disabled/>
                                        <FontAwesomeIcon icon={faPencil} className="icon-pencil" id="edit-button" onClick={this.handleEditPhone}/>
                                        <FontAwesomeIcon icon={faSave} className="icon-save hide" id="save-button" onClick={this.handleEditPhone}/>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProfilePictureCropperModal donefunction={this.handleEditImage}/>
                <AlertModal show={this.state.showAlertModal} message={this.state.alertMessage} closeModalFunction={this.closeAlertModal}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserFunction: () => dispatch(getUser()),
        openModalFunction: (imgUrl) => dispatch(openModal(imgUrl)),
        editProfileFunction: (user) => dispatch(editProfile(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)