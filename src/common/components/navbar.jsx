import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCaretDown, faCaretRight, faBookOpen, faFlag, faCog } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCalendar } from '../../dashboard/action';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BookingExpand: false,
            AdminExpand: false,
            Active: 'Dashboard'
        }
        this.sidebarRef = React.createRef();
    }

    componentDidMount() {
        this.sidebarRef.current.addEventListener('transitionend', this.handleTransitionEnd);
        switch (document.location.pathname) {
            case '/':
                this.setState({ Active: 'Dashboard', BookingExpand: false, AdminExpand: false});
                break;
            case '/profile':
                this.setState({ Active: 'none', BookingExpand: false, AdminExpand: false});
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        this.sidebarRef.current.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    handleTransitionEnd = () => {
        if (document.location.pathname === '/') {
            this.props.calendarRef.current.getApi().updateSize();
        }
        document.querySelector('body').classList.remove('animate');
    };

    render() {
        let BookingExpand = this.state.BookingExpand;
        let AdminExpand = this.state.AdminExpand;
        let Active = this.state.Active;

        return (
            <div className="left-sidebar" ref={this.sidebarRef}>
                <div className='top'>
                    <div className="element">
                        <div className={`header ${Active === 'Dashboard' ? 'active' : ''}`}>
                            <FontAwesomeIcon className="header-icon" icon={faChartLine}/>
                            <h3 className="header-name"><a href='/'>Dashboard</a></h3>
                        </div>
                    </div>
                    <div className={`expanding-element ${BookingExpand ? 'expanded' : ''}`}>
                        <div className='header' onClick={() => this.setState({ BookingExpand: !BookingExpand })}>
                            <FontAwesomeIcon icon={BookingExpand ? faCaretDown : faCaretRight}/>
                            <FontAwesomeIcon className="header-icon" icon={faBookOpen}/>
                            <h3 className="header-name">Sewa</h3>
                        </div>
                        <ul>
                            <li>Gedung</li>
                            <li>Ruangan</li>
                            <li>Selasar</li>
                            <li>Kendaraan</li>
                        </ul>
                    </div>
                    <div className="element">
                        <div className="header">
                            <FontAwesomeIcon className="header-icon" icon={faFlag}/>
                            <h3 className="header-name">Keluhan</h3>
                        </div>
                    </div>
                    <div className={`expanding-element ${AdminExpand ? 'expanded' : ''}`}>
                        <div className="header" onClick={() => this.setState({ AdminExpand: !AdminExpand })}>
                            <FontAwesomeIcon icon={AdminExpand ? faCaretDown : faCaretRight}/>
                            <FontAwesomeIcon className="header-icon" icon={faCog}/>
                            <h3 className="header-name">Admin</h3>
                        </div>
                        <ul>
                            <li>Gedung</li>
                            <li>Ruangan</li>
                            <li>Selasar</li>
                            <li>Kendaraan</li>
                            <li>Manajemen Role</li>
                        </ul>
                    </div>
                    <div className="element">
                        <div className="header">
                            <FontAwesomeIcon className="header-icon" icon={faBookOpen}/>
                            <h3 className="header-name">Manajemen Sewa</h3>
                        </div>
                    </div>
                    <div className="element">
                        <div className="header">
                            <FontAwesomeIcon className="header-icon" icon={faFlag}/>
                            <h3 className="header-name">Manajemen Keluhan</h3>
                        </div>
                    </div>
                </div>
                <div className='bottom'>
                    <p className="bottom-text">Copyright Sarpras ITB Version 1.0.0</p>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        calendarRef: state.dashboard.calendarRef
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCalendarFunction: (calendarRef) => dispatch(setCalendar(calendarRef))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)