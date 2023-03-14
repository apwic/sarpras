import React from 'react';
import { faBars, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import './style.css'
import logo from '../assets/logo.svg'
import { getUser, logout } from '../auth/action';
import { withRouter } from '../withRouter';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDropdown: false,
            notificationDropdown: false,
            user: {},
        }
    }

    componentDidMount() {
        this.props.getUserFunction();
        if (localStorage.getItem('showSidebar') === null) {
            localStorage.setItem('showSidebar', true);
        }
        if (localStorage.getItem('showSidebar') === 'false') {
            document.querySelector('.left-sidebar').classList.add('hide');
            document.querySelector('.topbar-logo-text').classList.add('hide');
            document.querySelector('body').classList.add('no-sidebar');
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
    }

    handleRouteOnclick = (route) => {
        if (route === '/profile') {
            this.profileDropdown();
        }
        this.props.navigate(route);
    }

    toggleSidebar = () => {
        localStorage.setItem('showSidebar', localStorage.getItem('showSidebar') ? !JSON.parse(localStorage.getItem('showSidebar')) : true);
        document.querySelector('body').classList.add('animate');
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

    logoutOnClick = () => {
        this.props.logoutFunction();
    }

    render() {
        let profileDropdown = this.state.profileDropdown;
        let notificationDropdown = this.state.notificationDropdown;
        return (
        <div>
            <div className="topbar">
                <div className='topbar-left'>
                    <div className="topbar-logo" onClick={() => this.handleRouteOnclick('/')}>
                        <img src={logo} alt="logo"/>
                        <p className="topbar-logo-text">DIREKTORAT SARANA DAN PRASARANA INSTITUT TEKNOLOGI BANDUNG</p>
                    </div>
                    <FontAwesomeIcon icon={faBars} className="topbar-menu-icon" onClick={this.toggleSidebar}/>
                </div>
                <div className="topbar-user">
                    <p className='topbar-user-content'>{this.state.user.name}</p>
                    <FontAwesomeIcon icon={faBell} className={`topbar-user-content notification-icon ${notificationDropdown? 'active' : ''}`} onClick={this.notificationDropdown}/>
                    {this.state.user.image ? 
                        <img src={this.state.user.image} alt="profile" className={`topbar-user-content profile-photo ${profileDropdown? 'active' : ''}`} onClick={this.profileDropdown}/>
                        :
                        <FontAwesomeIcon icon={faUserCircle} className={`topbar-user-content profile-icon ${profileDropdown? 'active' : ''}`} onClick={this.profileDropdown}/>
                    }
                </div>
            </div>
            <div className={`profile-dropdown ${!profileDropdown ? 'hide' : ''}`}>
                <ul>
                    <li onClick={() => this.handleRouteOnclick('/profile')}>Profil</li>
                    <li onClick={this.logoutOnClick}>Keluar</li>
                </ul>
            </div>
            <div className={`notification-dropdown ${!notificationDropdown ? 'hide' : ''}`}>
                <p>No new notification.</p>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        calendarModalOpen: state.dashboard.calendarModalOpen,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		logoutFunction: () => dispatch(logout()),
        getUserFunction: () => dispatch(getUser()),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Topbar))