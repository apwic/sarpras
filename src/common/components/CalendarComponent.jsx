import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

class ComponentCalendar extends React.Component {
    render() {
        return (
            <div className="calendar-component">
                <div className="calendar">
                    <div className="header">
                        <h1>PILIH TANGGAL SEWA</h1>
                    </div>
                    <FullCalendar
                        themeSystem="bootstrap5"
                        ref={this.props.bookRef}
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
                        events={[
                            {
                                title: 'CRCS STEI Multipurpose',
                                date: '2023-02-01T07:00:00+07:00',
                                color: 'red',
                            },
                            {
                                title: 'Labtek V',
                                date: '2023-02-02T07:00:00+09:00',
                            },
                            {
                                title: 'Harbolnas',
                                date: '2023-01-29',
                                color: 'red',
                                display: 'background',
                                textColor: '#FFFFFF',
                            },
                        ]}
                        dateClick={this.props.handleDateClick}
                        eventTextColor="#FFFFFF"
                    />
                </div>
            </div>
        );
    }
}

export default ComponentCalendar;
