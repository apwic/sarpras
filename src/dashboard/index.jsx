import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCircle, faChartLine, faDoorOpen, faPeopleLine, faTruck } from '@fortawesome/free-solid-svg-icons'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { connect } from 'react-redux';
import React from 'react';
import { openModal, setCalendar } from './action';
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
            user: this.props.user ? this.props.user : null
        }
    }

    componentDidMount() {
        if (this.props.user === null) {
            this.props.getUserFunction();
        }
        this.props.setCalendarFunction(this.calendarRef);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.setState({ user: this.props.user });
        }
    }

    handleDateClick = (arg) => {
        this.props.openModalFunction(arg.date);
    };

    render() {
        if (this.state.user === null) {
            return (
                <LoadingScreen/>
            )
        }
        return(
            <div className='container-dashboard'>
                <div className='container-dashboard__header'>
                    <FontAwesomeIcon icon={faChartLine} className="icon-dashboard"/>
                    <h1>Dashboard</h1>
                </div>
                <div className='container-dashboard__body'>
                    <div className='container-dashboard__body__item'>
                        <div className='item__dashboard'>
                            <div className='item__left'>
                                <div className='item__header'>
                                    <h2>Gedung</h2>
                                </div>
                                <div className='item__body'>
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>20 peminjam (Februari)</p>
                                        <p>200 peminjam (2023)</p>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{"color":"#00B140"}}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faBuilding} className="fa-stack-1x fa-inverse"></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className='item__dashboard'>
                            <div className='item__left'>
                                <div className='item__header'>
                                    <h2>Ruangan</h2>
                                </div>
                                <div className='item__body'>
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>20 peminjam (Februari)</p>
                                        <p>200 peminjam (2023)</p>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                            <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{"color":"#ED9121"}}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faDoorOpen} className="fa-stack-1x fa-inverse"></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className='item__dashboard'>
                            <div className='item__left'>
                                <div className='item__header'>
                                    <h2>Selasar</h2>
                                </div>
                                <div className='item__body'>
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>20 peminjam (Februari)</p>
                                        <p>200 peminjam (2023)</p>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{"color":"#EEE600"}}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faPeopleLine} className="fa-stack-1x fa-inverse"></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                        <div className='item__dashboard'>
                            <div className='item__left'>
                                <div className='item__header'>
                                    <h2>Kendaraan</h2>
                                </div>
                                <div className='item__body'>
                                    <p>Jumlah peminjaman</p>
                                    <div className="item__body__peminjaman">
                                        <p>20 peminjam (Februari)</p>
                                        <p>200 peminjam (2023)</p>
                                    </div>
                                </div>
                            </div>
                            <div className='item__right'>
                                <span className="fa-stack fa-3x">
                                    <FontAwesomeIcon icon={faCircle} className="fa-stack-2x" style={{"color":"gray"}}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faTruck} className="fa-stack-1x fa-inverse"></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='container-dashboard__body__calendar'>
                        <div className='item__header'>
                            <h2 style={{"marginBottom":"30px", "textAlign":"center"}}>Kalender Status Peminjaman</h2>
                        </div>
                        <FullCalendar
                            themeSystem='bootstrap5'
                            ref={this.calendarRef}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                            initialView={"dayGridMonth"}
                            headerToolbar={{
                                start: "prevYear prev,next nextYear",
                                center: "title",
                                end: "today dayGridMonth,timeGridWeek"
                            }}
                            events={[
                                { title: "CRCS STEI Multipurpose", date: "2023-02-01T07:00:00+07:00", color: "red" },
                                { title: "Labtek V", date: "2023-02-02T07:00:00+09:00" },
                                { title: "Harbolnas", date: "2023-01-29", color: "red", display: "background", textColor: "#FFFFFF" },
                            ]}
                            dateClick={this.handleDateClick}
                            eventTextColor="#FFFFFF"
                        />
                    </div>
                    <CalendarModal/>
                </div>
            </div>
        )
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
        setCalendarFunction: (calendarRef) => dispatch(setCalendar(calendarRef)),
        openModalFunction: (selectedDate) => dispatch(openModal(selectedDate)),
        closeModalFunction: () => dispatch(closeModal()),
        getUserFunction: () => dispatch(getUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)