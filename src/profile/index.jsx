import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import "./style.css"
import { getUser } from '../common/auth/action';
import { openModal } from './action';
import ProfilePictureCropperModal from '../common/components/imageModal';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnEdit: false,
            user: {
                name: '',
                nim_nip: '',
                email: '',
                no_telp: '',
                image: ''
            }
        }
    }

    componentDidMount() {
        this.props.getUserFunction();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
    }

    handleEditProfile = () => {
        const { isOnEdit } = this.state;
        document.getElementById('phone').disabled = isOnEdit;
        this.setState({ isOnEdit: !isOnEdit });
        document.getElementById('save-button').classList.toggle('hide');
        document.getElementById('edit-button').classList.toggle('hide');
    }

    handlePhoneChange = (event) => {
        this.setState({ user: { 
            ...this.state.user,
            no_telp: event.target.value
        } });
    }

    handleImageChange = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        this.props.openModalFunction(url);
        document.getElementById('profile-photo-file').value = '';
    }

    render() {
        let role = this.state.user.role;
        let emailValue = this.state.user.email;
        let phoneValue = this.state.user.no_telp;

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
                                        <FontAwesomeIcon icon={faPencil} className="icon-pencil" id="edit-button" onClick={this.handleEditProfile}/>
                                        <FontAwesomeIcon icon={faSave} className="icon-save hide" id="save-button" onClick={this.handleEditProfile}/>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                </div>
                <ProfilePictureCropperModal/>
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
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile)