import React from 'react';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faCaretDown, faCaretRight, faBookOpen, faFlag, faCog } from '@fortawesome/free-solid-svg-icons';

class Navbar extends React.Component {
    state = {
        BookingExpand: false,
        AdminExpand: false,
    }

    render() {
        let BookingExpand = this.state.BookingExpand;
        let AdminExpand = this.state.AdminExpand;

        return (
            <div className="left-sidebar">
                <div className="element">
                    <div className="header">
                        <FontAwesomeIcon className="header-icon" icon={faChartLine}/>
                        <h3 className="header-name">Dashboard</h3>
                    </div>
                </div>
                <div className={`expanding-element ${BookingExpand ? 'expanded' : ''}`}>
                    <div className="header" onClick={() => this.setState({ BookingExpand: !BookingExpand })}>
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
        );
    }
}

export default Navbar;