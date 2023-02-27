import React from 'react';
import './style.css'
import logo from '../assets/logo.svg'
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Topbar extends React.Component {
    state = {
        profileDropdown: false,
        notificationDropdown: false,
    }

    hideSidebar = () => {
        document.querySelector('.left-sidebar').classList.toggle('hide');
        document.querySelector('.topbar-logo-text').classList.toggle('hide');
        document.querySelector('body').classList.toggle('no-sidebar');
    }

    profileDropdown = () => {
        this.setState({ profileDropdown: !this.state.profileDropdown });
        if (this.state.notificationDropdown) {
            this.setState({ notificationDropdown: false });
        }
    }

    notificationDropdown = () => {
        this.setState({ notificationDropdown: !this.state.notificationDropdown });
        if (this.state.profileDropdown) {
            this.setState({ profileDropdown: false });
        }
    }

    render() {
        let profileDropdown = this.state.profileDropdown;
        let notificationDropdown = this.state.notificationDropdown;
        return (
        <div>
            <div className="topbar">
                <div className='topbar-left'>
                    <div className="topbar-logo">
                        <a href="/">
                            <img src={logo} alt="logo"/>
                        </a>
                        <p className="topbar-logo-text">DIREKTORAT SARANA DAN PRASARANA INSTITUT TEKNOLOGI BANDUNG</p>
                    </div>
                    <FontAwesomeIcon icon={faBars} className="topbar-menu-icon" onClick={this.hideSidebar}/>
                </div>
                <div className="topbar-user">
                    <p className='topbar-user-content'>Username</p>
                    <FontAwesomeIcon icon={faBell} className={`topbar-user-content notification-icon ${notificationDropdown? 'active' : ''}`} onClick={this.notificationDropdown}/>
                    <FontAwesomeIcon icon={faUserCircle} className={`topbar-user-content profile-icon ${profileDropdown? 'active' : ''}`} onClick={this.profileDropdown}/>
                </div>
            </div>
            <div className={`profile-dropdown ${!profileDropdown ? 'hide' : ''}`}>
                <ul>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className={`notification-dropdown ${!notificationDropdown ? 'hide' : ''}`}>
                <p>No new notification.</p>
            </div>
        </div>
        );
    }
}

export default Topbar;