import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Meeting.css';
import SessionService from '../../services/session-service';
import MeetingService from '../../services/meeting-service';
import SlideThumbnail from './SlideThumbnail/SlideThumbnail';
import ApiService from '../../services/api-service';
import Scrollbars from 'react-custom-scrollbars';
import SlidePreview from './SlidePreview/SlidePreview';
let socket;

const Meeting = ({ location }) => {

    const [meetingId, setMeetingId] = useState("");
    const [currentSlideId, setCurrentSlideId] = useState(1);
    const [meeting, setMeeting] = useState({ slides: [] });

    const ENDPOINT = ApiService.getBaseUrl();

    useEffect(() => {

        const { id } = queryString.parse(location.search);
        setMeetingId(id);

        (async () => {
            setMeeting({})
            setMeeting(await MeetingService.getMeetingById(id))
        })();

        if (!socket) {
            socket = io(ENDPOINT);
            socket.emit('join', { username: SessionService.getSession().username, meetingId: id }, ({ meetingId, currentSlideId }) => {
                setCurrentSlideId(currentSlideId);
            });
            socket.on('notification', ({ text }) => {
                console.log(text);
                //alert(text);
            })
            socket.on('slide-changed', ({ meetingId, currentSlideId }, callback) => {
                console.log(meetingId, currentSlideId);
                setCurrentSlideId(currentSlideId);
            });
        }
    }, []);

    const notifySlideChange = (id) => {
        socket.emit('slide-change', { meetingId, currentSlideId: id }, (meeting) => {

        });
    }
    const selectSlide = (id) => {
        setCurrentSlideId(id);
        notifySlideChange(id);
    }

    return (
        <section style={{ height: 'calc(100vh - 65px)' }}>
            <div className="container-fluid h-100" style={{ padding: '1rem 1rem' }}>
                <div className="row h-100">
                    <div className="col-md-10 h-100">
                        <div className="card h-100">
                            <div className="card-header card-header-sm">
                                <h6 className="btn-padding">Slide ({currentSlideId})</h6>
                            </div>
                            <div className="card-body">
                                <div className="container h-100">
                                    
                                        <SlidePreview meeting={meeting} currentSlideId={currentSlideId}></SlidePreview>
                                </div>
                            </div>
                            <div className="card-footer card-header-sm">
                                footer
                                    </div>
                        </div>
                    </div>
                    <div className="col-md-2 h-100">
                        <div className="card h-100">
                            <div className="card-header card-header-sm" >
                                <i className="btn-sm-padding">Slides</i>
                                <button className="btn btn-sm float-right"><i className="fa fa-bars"></i></button>
                            </div>
                            <Scrollbars>
                            <div className="card-body">
                                
                                    {
                                        meeting && meeting.slides
                                            ? meeting.slides.map(slide =>
                                                <SlideThumbnail key={slide.id} slide={slide} selectSlide={selectSlide} isSelected={currentSlideId === slide.id}></SlideThumbnail>
                                            )
                                            : 'loading...'
                                    }
                            </div>
                            </Scrollbars>
                            <div className="card-footer card-header-sm">
                                count
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Meeting;

// <div>
//             <h1>This is Meeting {meetingId} and current slide is {currentSlideId}</h1>
//             <div><input id="slideId" name="slideId" value={currentSlideId} onChange={(event) => setCurrentSlideId(event.target.value)} /> <button onClick={notifySlideChange}>Change Slide</button></div>
//         </div>