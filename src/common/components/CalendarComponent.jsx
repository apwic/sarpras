import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { connect } from 'react-redux';
import { getEvents, setCalendarBook } from '../../booking/action';
import EventDetailModal from './eventDetailModal';

class ComponentCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsShown: null,
            show: false,
            title: '',
            start: '',
            end: '',
        };
        this.calendarRef = React.createRef();
    }

    componentDidMount() {
        this.props.setCalendarBookFunction(this.calendarRef);
        const calendarApi = this.calendarRef.current.getApi();
        const view = calendarApi.view;
        const startOfMonth = view.activeStart.toISOString().substring(0, 10);
        const endOfMonth = view.activeEnd.toISOString().substring(0, 10);
        this.props.getEventsFunction(startOfMonth, endOfMonth);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.events !== this.props.events) {
            this.filterEvents();
        }
    }

    fetchEvents() {
        const calendarApi = this.calendarRef.current.getApi();
        const view = calendarApi.view;
        const startOfMonth = view.activeStart.toISOString().substring(0, 10);
        const endOfMonth = view.activeEnd.toISOString().substring(0, 10);
        this.props.getEventsFunction(startOfMonth, endOfMonth);
        this.filterEvents();
    }

    eventClick = (info) => {
        const options = { hour12: false, hour: '2-digit', minute: '2-digit' };
        this.setState({
            title: info.event.title,
            start: info.event.start.toLocaleTimeString('en-US', options),
            end: info.event.end.toLocaleTimeString('en-US', options),
        });
        this.setState({ show: true });
    };

    filterEvents() {
        const eventsFacilityMatch = this.props.events.booking.filter(
            (event) => event.facility_id === parseInt(this.props.facilityId),
        );
        const eventsShown = eventsFacilityMatch.map((booking) => ({
            id: booking.id,
            title: booking.description,
            start: booking.start_timestamp,
            end: booking.end_timestamp,
            color: booking.status === 'PENDING' ? 'red' : 'green',
        }));
        this.setState({ eventsShown });
    }

    handleCalendarNavigation = (method) => {
        const calendarApi = this.calendarRef.current.getApi();
        calendarApi[method]();
        this.fetchEvents();
    };

    handleDayGridMonthClicked = () => {
        this.handleCalendarNavigation('changeView', 'dayGridMonth');
    };

    handleTimeGridWeekClicked = () => {
        this.handleCalendarNavigation('changeView', 'timeGridWeek');
    };

    handleDateClick = (arg) => {
        const calendarApi = this.calendarRef.current.getApi();
        this.props.handleDateClick(
            arg,
            calendarApi.view.type,
            this.state.eventsShown,
        );
    };

    render() {
        return (
            <div className="calendar-component">
                <div className="calendar">
                    <div className="header">
                        <h1>PILIH TANGGAL SEWA</h1>
                    </div>
                    <FullCalendar
                        themeSystem="bootstrap5"
                        ref={this.calendarRef}
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            bootstrap5Plugin,
                        ]}
                        initialView={'dayGridMonth'}
                        headerToolbar={{
                            start: 'prevYear prev,next nextYear',
                            center: 'title',
                            end: 'today dayGridMonth,timeGridWeek',
                        }}
                        events={this.state.eventsShown}
                        dateClick={this.handleDateClick}
                        eventTextColor="#FFFFFF"
                        eventClick={this.eventClick}
                    />
                </div>
                <EventDetailModal
                    calendarModalOpen={this.state.show}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    closeModalFunction={() => this.setState({ show: false })}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.facility.eventsShown,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getEventsFunction: (start, end) => dispatch(getEvents(start, end)),
        setCalendarBookFunction: (ref) => dispatch(setCalendarBook(ref)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentCalendar);
