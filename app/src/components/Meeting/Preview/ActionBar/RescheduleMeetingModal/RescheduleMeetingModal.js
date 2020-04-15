import React, { useState, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import bootstrapPlugin from '@fullcalendar/bootstrap';

import './RescheduleMeetingModal.css';
import { Modal, Button } from 'react-bootstrap';

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

const RescheduleMeetingModal = ({ show, setShow }) => {
    
    const [events, setEvents] = useState([]);
    const calendarComponentRef = useRef(null);
    const submit = () => {
        setShow(false);
    };
    const handleDateClick = (arg) => {
        setEvents([{
            title: "Schedule",
            start: arg.date,
            allDay: arg.allDay
        }])
    }
    // const onCalendarLoad = () => {
    //     let calendar = this.calendarComponentRef.current.getApi();
    //     calendar.changeView('timeGridDay');
    // }
    return (
        <Modal size="lg" aria-labelledby="reschedule-meeting-title" centered
            show={show} onHide={() => setShow(false)}
            dialogClassName="modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title id="reschedule-meeting-title">
                    Reschedule Meeting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FullCalendar
                    
                    ref={calendarComponentRef}
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                    }}
                    plugins={[bootstrapPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    themeSystem="bootstrap"
                    events={events}
                    dateClick={handleDateClick}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => submit(false)}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RescheduleMeetingModal;