import React from 'react';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnEdit: false,
            email: '13520000@staff.itb.ac.id',
            phone: '081234567890',
        }
    }

    handleEditProfile = () => {
        if (this.state.isOnEdit) {
            document.getElementById('email').disabled = true;
            document.getElementById('phone').disabled = true;
            document.getElementById('edit-profile-btn').classList.add('secondary');
            document.getElementById('edit-profile-btn').innerHTML = 'Edit';
            this.setState({ isOnEdit: false });
        } else {
            document.getElementById('email').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('edit-profile-btn').classList.remove('secondary');
            document.getElementById('edit-profile-btn').innerHTML = 'Save';
            this.setState({ isOnEdit: true });
        }
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    handlePhoneChange = (event) => {
        this.setState({ phone: event.target.value });
    }

    render() {
        let isOnEdit = this.state.isOnEdit;
        let emailValue = this.state.email;
        let phoneValue = this.state.phone;

        return (
            <div className='container-profile'>
                <div className='container-profile__header'>
                    <FontAwesomeIcon icon={faUserCircle} className="icon-profile"/>
                    <h1>Profile</h1>
                </div>
                <div className='container-profile__body'>
                    <div className="container-profile__body__header">
                        <div className="profile-photo">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
                        </div>
                        <div className="profile-details">
                            <h2>Arik Rayi Arkananta</h2>
                            <p>Dosen</p>
                            <p>13520000</p>
                        </div>
                        <div className="total-container">
                            <div className="total-box">
                                <div className="total-text">BOOKINGS</div>
                                <div className="total-number">0</div>
                            </div>
                            <div className="total-box">
                                <div className="total-text">REPORTS</div>
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
                                        <input type="text" name="email" id="email" value={emailValue} onChange={this.handleEmailChange} {...isOnEdit ?  "" : "disabled"}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>
                                        <input type="number" name="phone" id="phone" value={phoneValue} onChange={this.handlePhoneChange} {...isOnEdit ?  "" : "disabled"}/>
                                    </td>
                                </tr>   
                            </tbody>
                        </table>
                    </div>
                    <div className="container-profile__buttons">
                        <button className="secondary" id="edit-profile-btn" onClick={this.handleEditProfile}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile