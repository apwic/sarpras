import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faCaretDown,
    faCaretRight,
    faBookOpen,
    faFlag,
    faCog,
    faListCheck,
    faHotel,
    faUniversity,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setCalendar } from '../../dashboard/action';
import { setCalendarBook } from '../../booking/action';
import { getUser } from '../auth/action';
import { withRouter } from '../withRouter';
import roleConstant from '../constants/roleConstant';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BookingExpand: false,
            AdminExpand: false,
            Active: 'Dashboard',
            TestingServiceExpand: false,
            user: {},
        };
        this.sidebarRef = React.createRef();
    }

    componentDidMount() {
        this.props.getUserFunction();
        this.sidebarRef.current.addEventListener(
            'transitionend',
            this.handleTransitionEnd,
        );
        switch (document.location.pathname) {
            case '/':
                this.setState({
                    Active: 'Dashboard',
                    BookingExpand: false,
                    AdminExpand: false,
                });
                break;
            case '/profile':
                this.setState({
                    Active: 'none',
                    BookingExpand: false,
                    AdminExpand: false,
                });
                break;
            case '/role-management':
                this.setState({
                    Active: 'Role-Management',
                    BookingExpand: false,
                    AdminExpand: true,
                });
                break;
            case '/booking/vehicle':
                this.setState({
                    Active: 'Booking-Vehicle',
                    BookingExpand: true,
                    AdminExpand: false,
                });
                break;
            case '/booking/building':
                this.setState({
                    Active: 'Booking-Building',
                    BookingExpand: true,
                    AdminExpand: false,
                });
                break;
            case '/booking/room':
                this.setState({
                    Active: 'Booking-Room',
                    BookingExpand: true,
                    AdminExpand: false,
                });
                break;
            case '/booking/selasar':
                this.setState({
                    Active: 'Booking-Selasar',
                    BookingExpand: true,
                    AdminExpand: false,
                });
                break;
            case '/booking/my':
                this.setState({
                    Active: 'My-Booking',
                    BookingExpand: true,
                    AdminExpand: false,
                });
                break;
            case '/report/my':
                this.setState({
                    Active: 'My-Report',
                    BookingExpand: false,
                    AdminExpand: false,
                });
                break;
            case '/admin/vehicle':
                this.setState({
                    Active: 'Admin-Vehicle',
                    BookingExpand: false,
                    AdminExpand: true,
                });
                break;
            case '/admin/building':
                this.setState({
                    Active: 'Admin-Building',
                    BookingExpand: false,
                    AdminExpand: true,
                });
                break;
            case '/admin/room':
                this.setState({
                    Active: 'Admin-Room',
                    BookingExpand: false,
                    AdminExpand: true,
                });
                break;
            case '/admin/selasar':
                this.setState({
                    Active: 'Admin-Selasar',
                    BookingExpand: false,
                    AdminExpand: true,
                });
                break;
            case '/manage/report':
                this.setState({
                    Active: 'Report-Management',
                    BookingExpand: false,
                    AdminExpand: false,
                });
                break;
            case '/manage/booking':
                this.setState({
                    Active: 'Booking-Management',
                    BookingExpand: false,
                    AdminExpand: false,
                });
                break;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
        if (this.props.location !== prevProps.location) {
            switch (document.location.pathname) {
                case '/':
                    this.setState({ Active: 'Dashboard' });
                    break;
                case '/profile':
                    this.setState({ Active: 'none' });
                    break;
                case '/role-management':
                    this.setState({ Active: 'Role-Management' });
                    break;
                case '/booking/vehicle':
                    this.setState({ Active: 'Booking-Vehicle' });
                    break;
                case '/booking/building':
                    this.setState({ Active: 'Booking-Building' });
                    break;
                case '/booking/room':
                    this.setState({ Active: 'Booking-Room' });
                    break;
                case '/booking/selasar':
                    this.setState({ Active: 'Booking-Selasar' });
                    break;
                case '/booking/my':
                    this.setState({ Active: 'My-Booking' });
                    break;
                case '/report/my':
                    this.setState({ Active: 'My-Report' });
                    break;
                case '/admin/vehicle':
                    this.setState({ Active: 'Admin-Vehicle' });
                    break;
                case '/admin/building':
                    this.setState({ Active: 'Admin-Building' });
                    break;
                case '/admin/room':
                    this.setState({ Active: 'Admin-Room' });
                    break;
                case '/admin/selasar':
                    this.setState({ Active: 'Admin-Selasar' });
                    break;
                case '/manage/report':
                    this.setState({ Active: 'Report-Management' });
                    break;
                case '/manage/booking':
                    this.setState({ Active: 'Booking-Management' });
                    break;
            }
        }
    }

    componentWillUnmount() {
        this.sidebarRef.current.removeEventListener(
            'transitionend',
            this.handleTransitionEnd,
        );
    }

    handleTransitionEnd = () => {
        if (
            document.location.pathname === '/' ||
            document.location.pathname ===
                `/booking/${this.props.params.type}/${this.props.params.id}`
        ) {
            this.props.calenderRef.current.getApi().updateSize();
        }
        document.querySelector('body').classList.remove('animate');
    };

    handleRouteOnclick = (route) => {
        this.props.navigate(route);
    };

    render() {
        let BookingExpand = this.state.BookingExpand;
        let AdminExpand = this.state.AdminExpand;
        let Active = this.state.Active;
        let TestingServiceExpand = this.state.TestingServiceExpand;

        return (
            <div className="left-sidebar" ref={this.sidebarRef}>
                <div className="top">
                    <div className="element">
                        <div
                            className={`header ${
                                Active === 'Dashboard' ? 'active' : ''
                            }`}
                        >
                            <FontAwesomeIcon
                                className="header-icon"
                                icon={faChartLine}
                            />
                            <h3
                                className="header-name"
                                onClick={() => this.handleRouteOnclick('/')}
                            >
                                Dashboard
                            </h3>
                        </div>
                    </div>
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div
                            className={`expanding-element ${
                                BookingExpand ? 'expanded' : ''
                            }`}
                        >
                            <div
                                className="header"
                                onClick={() =>
                                    this.setState({
                                        BookingExpand: !BookingExpand,
                                    })
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        BookingExpand
                                            ? faCaretDown
                                            : faCaretRight
                                    }
                                />
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faBookOpen}
                                />
                                <h3 className="header-name">Peminjaman</h3>
                            </div>
                            <ul>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/building',
                                        )
                                    }
                                    className={
                                        Active === 'Booking-Building'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    Gedung
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick('/booking/room')
                                    }
                                    className={
                                        Active === 'Booking-Room'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    Ruangan
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/selasar',
                                        )
                                    }
                                    className={
                                        Active === 'Booking-Selasar'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    Selasar
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/vehicle',
                                        )
                                    }
                                    className={
                                        Active === 'Booking-Vehicle'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    Kendaraan
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick('/booking/my')
                                    }
                                    className={
                                        Active === 'My-Booking' ? 'active' : ''
                                    }
                                >
                                    Peminjaman Saya
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/building',
                                        )
                                    }
                                >
                                    Laboratorium
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/building',
                                        )
                                    }
                                >
                                    Peralatan
                                </li>
                            </ul>
                        </div>
                    )}
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div className="element">
                            <div
                                className={`header ${
                                    Active === 'My-Report' ? 'active' : ''
                                }`}
                                onClick={() =>
                                    this.handleRouteOnclick('/report/my')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faFlag}
                                />
                                <h3 className="header-name">Keluhan</h3>
                            </div>
                        </div>
                    )}
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div
                            className={`expanding-element ${
                                TestingServiceExpand ? 'expanded' : ''
                            }`}
                        >
                            <div
                                className="header"
                                onClick={() =>
                                    this.setState({
                                        TestingServiceExpand:
                                            !TestingServiceExpand,
                                    })
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        TestingServiceExpand
                                            ? faCaretDown
                                            : faCaretRight
                                    }
                                />
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faListCheck}
                                />
                                <h3 className="header-name">
                                    Layanan Pengujian
                                </h3>
                            </div>
                            <ul>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick(
                                            '/booking/building',
                                        )
                                    }
                                >
                                    Kualitas Udara
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick('/booking/room')
                                    }
                                >
                                    Kualitas Air
                                </li>
                                <li
                                    onClick={() =>
                                        this.handleRouteOnclick('/booking/room')
                                    }
                                >
                                    Kualitas Beton
                                </li>
                            </ul>
                        </div>
                    )}
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div className="element">
                            <div
                                className={'header'}
                                onClick={() =>
                                    this.handleRouteOnclick('/report/my')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faHotel}
                                />
                                <h3 className="header-name">Asrama</h3>
                            </div>
                        </div>
                    )}
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div className="element">
                            <div
                                className={'header'}
                                onClick={() =>
                                    this.handleRouteOnclick('/booking/room')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faUniversity}
                                />
                                <h3 className="header-name">ITB Jatinangor</h3>
                            </div>
                        </div>
                    )}
                    {this.state.user.role === roleConstant.BASIC_USER.name && (
                        <div className="element">
                            <div
                                className={'header'}
                                onClick={() =>
                                    this.handleRouteOnclick('/booking/vehicle')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faUniversity}
                                />
                                <h3 className="header-name">ITB Cirebon</h3>
                            </div>
                        </div>
                    )}
                    {(this.state.user.role === roleConstant.ADMIN.name ||
                        this.state.user.role ===
                            roleConstant.SUPER_USER.name) && (
                        <div
                            className={`expanding-element ${
                                AdminExpand ? 'expanded' : ''
                            }`}
                        >
                            <div
                                className="header"
                                onClick={() =>
                                    this.setState({
                                        AdminExpand: !AdminExpand,
                                    })
                                }
                            >
                                <FontAwesomeIcon
                                    icon={
                                        AdminExpand ? faCaretDown : faCaretRight
                                    }
                                />
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faCog}
                                />
                                <h3 className="header-name">Admin</h3>
                            </div>
                            <ul>
                                {this.state.user.role ===
                                    roleConstant.ADMIN.name && (
                                    <div>
                                        <li
                                            onClick={() =>
                                                this.handleRouteOnclick(
                                                    '/admin/building',
                                                )
                                            }
                                            className={
                                                Active === 'Admin-Building'
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            Gedung
                                        </li>
                                        <li
                                            onClick={() =>
                                                this.handleRouteOnclick(
                                                    '/admin/room',
                                                )
                                            }
                                            className={
                                                Active === 'Admin-Room'
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            Ruangan
                                        </li>
                                        <li
                                            onClick={() =>
                                                this.handleRouteOnclick(
                                                    '/admin/selasar',
                                                )
                                            }
                                            className={
                                                Active === 'Admin-Selasar'
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            Selasar
                                        </li>
                                        <li
                                            onClick={() =>
                                                this.handleRouteOnclick(
                                                    '/admin/vehicle',
                                                )
                                            }
                                            className={
                                                Active === 'Admin-Vehicle'
                                                    ? 'active'
                                                    : ''
                                            }
                                        >
                                            Kendaraan
                                        </li>
                                    </div>
                                )}
                                {this.state.user.role ===
                                    roleConstant.SUPER_USER.name && (
                                    <li
                                        className={`${
                                            Active === 'Role-Management'
                                                ? 'active'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            this.handleRouteOnclick(
                                                '/role-management',
                                            )
                                        }
                                    >
                                        Manajemen Role
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    {this.state.user.role ===
                        roleConstant.BOOKING_STAFF.name && (
                        <div className="element">
                            <div
                                className={`header ${
                                    Active === 'Booking-Management'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    this.handleRouteOnclick('/manage/booking')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faBookOpen}
                                />
                                <h3 className="header-name">
                                    Manajemen Peminjaman
                                </h3>
                            </div>
                        </div>
                    )}
                    {(this.state.user.role ===
                        roleConstant.SANITATION_STAFF.name ||
                        this.state.user.role ===
                            roleConstant.DEFECT_STAFF.name ||
                        this.state.user.role ===
                            roleConstant.SAFETY_STAFF.name ||
                        this.state.user.role ===
                            roleConstant.LOSS_STAFF.name) && (
                        <div className="element">
                            <div
                                className={`header ${
                                    Active === 'Report-Management'
                                        ? 'active'
                                        : ''
                                }`}
                                onClick={() =>
                                    this.handleRouteOnclick('/manage/report')
                                }
                            >
                                <FontAwesomeIcon
                                    className="header-icon"
                                    icon={faFlag}
                                />
                                <h3 className="header-name">
                                    Manajemen Keluhan
                                </h3>
                            </div>
                        </div>
                    )}
                </div>
                <div className="bottom">
                    <p className="bottom-text">&#169; 2023</p>
                    <p className="bottom-text">
                        Direktorat Sarana & Prasarana ITB
                    </p>
                    <p className="bottom-text">
                        {import.meta.env.VITE_VERSION}
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        calendarRef: state.dashboard.calendarRef,
        user: state.auth.user,
        calenderRef: state.facility.calendarBookRef,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCalendarFunction: (calendarRef) =>
            dispatch(setCalendar(calendarRef)),
        getUserFunction: () => dispatch(getUser()),
        setCalendarBookFunction: (calenderRef) =>
            dispatch(setCalendarBook(calenderRef)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
