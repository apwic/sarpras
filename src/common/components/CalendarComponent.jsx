import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { connect } from 'react-redux';
import { getEvents, setCalendarBook } from '../../booking/action';
import EventDetailModal from './eventDetailModal';
import { Spinner } from 'react-bootstrap';
import { withRouter } from '../withRouter';

class ComponentCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsShown: null,
            show: false,
            eventClicked: null,
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
            document.querySelector('#loading-calendar').style.display = 'none';
            this.filterEvents();
        }
    }

    fetchEvents = () => {
        if (this.calendarRef.current) {
            document.querySelector('#loading-calendar').style.display = 'block';
            const calendarApi = this.calendarRef.current.getApi();
            const view = calendarApi.view;
            const startOfMonth = view.activeStart.toISOString().slice(0, 10);
            const endOfMonth = view.activeEnd.toISOString().slice(0, 10);
            this.props.getEventsFunction(startOfMonth, endOfMonth);
        }
    };

    eventClick = (info) => {
        if (info.event.display === 'list-item') {
            return;
        }
        this.setState({
            eventClicked: {
                calendar: info.event,
                event: this.state.eventsShown.find(
                    (event) => event.id === parseInt(info.event.id),
                ),
            },
        });
        this.setState({ show: true });
    };

    filterEvents = () => {
        var eventsFacilityMatch;
        if (this.props.facilityId === 'all') {
            eventsFacilityMatch = this.props.events.booking;
        } else {
            eventsFacilityMatch = this.props.events.booking.filter(
                (event) =>
                    event.facility_id === parseInt(this.props.facilityId),
            );
        }
        const eventsHolidayMatch = this.props.events.holiday;
        const events = eventsFacilityMatch.map((booking) => ({
            id: booking.id,
            title: booking.user.name + ', ' + booking.facility.name,
            start: booking.start_timestamp,
            end: booking.end_timestamp,
            color: booking.status === 'PENDING' ? '#ED9121' : '#00B140',
            display: 'block',
            overlap: false,
        }));
        const eventsHoliday = eventsHolidayMatch.map((holiday) => ({
            title: holiday.summary,
            start: new Date(holiday.date),
            allDay: true,
            display: 'list-item',
            color: 'red',
        }));
        const eventsShown = events.concat(eventsHoliday);
        this.setState({ eventsShown });
    };

    handleCalendarNavigation = () => {
        this.setState({ eventsShown: null });
        this.fetchEvents();
    };

    handleDateClick = (arg) => {
        if (this.props.params.type) {
            const calendarApi = this.calendarRef.current.getApi();
            this.props.handleDateClick(
                arg,
                calendarApi.view.type,
                this.state.eventsShown,
            );
        }
    };

    render() {
        return (
            <div className="calendar-component">
                <div className="calendar">
                    {this.props.facilityId === 'all' ? (
                        <h2
                            style={{
                                marginBottom: '30px',
                                textAlign: 'center',
                            }}
                        >
                            Kalender Status Peminjaman
                        </h2>
                    ) : (
                        <h2 style={{ marginBottom: '25px' }}>
                            Pilih Tanggal Sewa
                        </h2>
                    )}
                    <div
                        className="calendar-container"
                        style={{ position: 'relative' }}
                    >
                        <Spinner
                            id="loading-calendar"
                            animation="border"
                            variant="primary"
                            style={{
                                position: 'absolute',
                                inset: 'auto',
                                zIndex: '1',
                                top: 'calc(50% + 1.1rem)',
                                left: 'calc(50% - 1rem)',
                            }}
                        />
                        <FullCalendar
                            viewClassNames={
                                this.state.eventsShown === null ? 'hidden' : ''
                            }
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
                            datesSet={(e) => this.handleCalendarNavigation(e)}
                            dateClick={this.handleDateClick}
                            eventTextColor="#FFFFFF"
                            eventClick={this.eventClick}
                            contentHeight="auto"
                        />
                    </div>
                </div>
                <EventDetailModal
                    calendarModalOpen={this.state.show}
                    event={this.state.eventClicked}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ComponentCalendar),
);
