import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import { useRef } from 'react';



const Dashboard = () => {
    const calendarRef = useRef(null);
    return(
        <div className='container-dashboard'>
            <div className='container-dashboard__header'>
                <FontAwesomeIcon icon={faChartLine} className="icon-dashboard"/>
                <h1>Dashboard</h1>
            </div>
            <div className='container-dashboard__body'>
                <div className='container-dashboard__body__item'>
                    <div className='item__dashboard'>
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
                    <div className='item__dashboard'>
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
                    <div className='item__dashboard'>
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
                    <div className='item__dashboard'>
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
                </div>
                <div className='container-dashboard__body__calendar'>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={"dayGridMonth"}
                        headerToolbar={{
                            start: "today prev, next",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}

                    />
                </div>
            </div>
        </div>
    )
}


export default Dashboard