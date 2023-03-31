import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faCircle,
    faChartLine,
    faDoorOpen,
    faPeopleLine,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';
import ComponentCalendar from '../common/components/CalendarComponent';
import { connect } from 'react-redux';
import React from 'react';
import { getStatistics, openModal, setCalendar } from './action';
import CalendarModal from '../common/components/calendarModal';
import { getUser } from '../common/auth/action';
import LoadingScreen from '../common/components/loadingScreen';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            showModal: false,
            selectedDate: null,
            user: this.props.user ? this.props.user : null,
            statistics: null,
            monthYear: null,
        };
    }

    componentDidMount() {
        if (this.props.user === null) {
            this.props.getUserFunction();
        }
        this.props.setCalendarFunction(this.calendarRef);
        const currentTime = new Date();
        const currentMonthName = currentTime.toLocaleString('id-ID', {
            month: 'long',
        });
        const currentMonth = currentTime.getMonth() + 1;
        const currentYear = currentTime.getFullYear();
        this.setState({
            monthYear: {
                month: currentMonth,
                year: currentYear,
                monthName: currentMonthName,
            },
        });
        this.props.getStatisticsFunction(
            '?month=' + currentMonth + '&year=' + currentYear,
        );
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
        if (prevProps.statistics !== this.props.statistics) {
            this.setState({ statistics: this.props.statistics });
        }
    }

    handleDateClick = (arg) => {
        this.props.openModalFunction(arg.date);
    };

    render() {
        if (this.state.user === null || this.state.statistics === null) {
            return <LoadingScreen />;
        }
        return (
            <div className="container-dashboard">
                <div className="container-dashboard__header">
                    <FontAwesomeIcon
                        icon={faChartLine}
                        className="icon-dashboard"
                    />
                    <h1>Dashboard</h1>
                </div>
                <div className="container-dashboard__body">
                    <div className="container-dashboard__body__item">
                        <div className="item__dashboard">
                            <div className="item__left">
                                <div className="item__header">
                                    <h2>Gedung</h2>
                                </div>
                                <div className="item__body">
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.building
                                                      .month
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.monthName
                                                : '0'}
                                            )
                                        </p>
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.building
                                                      .year
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.year
                                                : '0'}
                                            )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="fa-stack-2x"
                                        style={{ color: '#00B140' }}
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        className="fa-stack-1x fa-inverse"
                                    ></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className="item__dashboard">
                            <div className="item__left">
                                <div className="item__header">
                                    <h2>Ruangan</h2>
                                </div>
                                <div className="item__body">
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.room
                                                      .month
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.monthName
                                                : '0'}
                                            )
                                        </p>
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.room
                                                      .year
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.year
                                                : '0'}
                                            )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="fa-stack-2x"
                                        style={{ color: '#ED9121' }}
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon
                                        icon={faDoorOpen}
                                        className="fa-stack-1x fa-inverse"
                                    ></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className="item__dashboard">
                            <div className="item__left">
                                <div className="item__header">
                                    <h2>Selasar</h2>
                                </div>
                                <div className="item__body">
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.selasar
                                                      .month
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.monthName
                                                : '0'}
                                            )
                                        </p>
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.selasar
                                                      .year
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.year
                                                : '0'}
                                            )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="fa-stack-2x"
                                        style={{ color: '#EEE600' }}
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon
                                        icon={faPeopleLine}
                                        className="fa-stack-1x fa-inverse"
                                    ></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className="item__dashboard">
                            <div className="item__left">
                                <div className="item__header">
                                    <h2>Kendaraan</h2>
                                </div>
                                <div className="item__body">
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.vehicle
                                                      .month
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.monthName
                                                : '0'}
                                            )
                                        </p>
                                        <p>
                                            {this.state.statistics
                                                ? this.state.statistics.vehicle
                                                      .year
                                                : '0'}{' '}
                                            peminjaman (
                                            {this.state.monthYear
                                                ? this.state.monthYear.year
                                                : '0'}
                                            )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="item__right">
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        className="fa-stack-2x"
                                        style={{ color: 'gray' }}
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon
                                        icon={faTruck}
                                        className="fa-stack-1x fa-inverse"
                                    ></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ComponentCalendar
                        handleDateClick={this.handleDateClick}
                        facilityId="all"
                    />
                    <CalendarModal />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        calendarModalOpen: state.dashboard.calendarModalOpen,
        user: state.auth.user,
        statistics: state.dashboard.statistics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCalendarFunction: (calendarRef) =>
            dispatch(setCalendar(calendarRef)),
        openModalFunction: (selectedDate) => dispatch(openModal(selectedDate)),
        getUserFunction: () => dispatch(getUser()),
        getStatisticsFunction: (params) => dispatch(getStatistics(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
