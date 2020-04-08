import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Player.css';
import SessionService from '../../../services/session-service';
import MeetingService from '../../../services/meeting-service';
import SlideThumbnail from '../SlideThumbnail/SlideThumbnail';
import ApiService from '../../../services/api-service';
import Scrollbars from 'react-custom-scrollbars';
import SlidePreview from '../SlidePreview/SlidePreview';
import { Link } from 'react-router-dom';
let socket;

const Player = ({ location }) => {

    const [meetingId, setMeetingId] = useState("");
    const [currentSlideId, setCurrentSlideId] = useState(1);
    const [meeting, setMeeting] = useState({ slides: [] });

    const ENDPOINT = ApiService.getBaseUrl();

    // let videoPlayer;

    // const setVideoPlayer = (vp) => {
    //     console.log(vp)
    //     videoPlayer = vp;
    // }

    const slidePreview = useRef(null);

    useEffect(() => {

        const { id } = queryString.parse(location.search);
        setMeetingId(id);

        if (!socket) {
            socket = io(ENDPOINT);
            socket.emit('join', { username: (SessionService.getSession() || {}).username || 'anonymous', meetingId: id }, (meeting) => {
                setCurrentSlideId(meeting.currentSlideId);
                setMeeting(meeting);
            });
            socket.on('notification', ({ text }) => {
                console.log(text);
                //alert(text);
            })
            socket.on('slide-changed', ({ meetingId, currentSlideId }, callback) => {
                console.log(meetingId, currentSlideId);
                setCurrentSlideId(currentSlideId);
            });
            socket.on('slide-video-played', ({ }, callback) => {
                console.log('slide-video-played', slidePreview);
                slidePreview.current.playVideo(false);
            })
            socket.on('slide-video-paused', ({ }, callback) => {
                console.log('slide-video-paused', slidePreview);
                slidePreview.current.pauseVideo(false);
            })
            socket.on('slide-video-fullscreen-changed', ({ isFullscreen }, callback) => {
                console.log('slide-video-fullscreen-changed', isFullscreen);
                //slidePreview.current.videoFullscreen(isFullscreen);
            })
            socket.on('slide-video-seeked', ({ seconds }, callback) => {
                console.log('slide-video-seeked', seconds);
                slidePreview.current.seekVideo(seconds);
            })
            socket.on('slide-state-changed', ( ) => {
                console.log('slide-state-changed');
            })
        }
    }, []);

    const notifyPlayVideo = () => {
        socket.emit('slide-video-play', ({ meetingId }));
    }
    const notifyPauseVideo = () => {
        socket.emit('slide-video-pause', ({ meetingId }));
    }
    const notifySeekVideo = (seconds) => {
        socket.emit('slide-video-seek', ({ meetingId, seconds }));
    }
    const notifyVideoFullscreenChange = (isFullscreen) => {
        socket.emit('slide-video-fullscreen-change', ({ meetingId, isFullscreen }));
    }
    const notifySlideChange = (id) => {
        socket.emit('slide-change', { meetingId, currentSlideId: id }, (meeting) => {

        });
    }
    const notifySlideStateChange = (slideState) => {
        socket.emit('slide-state-change', slideState, (response) => {
            console.log(response);
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
                    <div className="col-md-10 col-sm-10 h-100">
                        <div className="card h-100">
                            <div className="card-header card-header-sm">
                                <h6 className="btn-padding">Slide ({currentSlideId})</h6>
                            </div>
                            <div className="card-body">
                                <div className="container h-100">
                                    <SlidePreview
                                        ref={slidePreview}
                                        meeting={meeting}
                                        currentSlideId={currentSlideId}
                                        onPlayVideo={notifyPlayVideo}
                                        onPauseVideo={notifyPauseVideo}
                                        onSeekVideo={notifySeekVideo}
                                        onVideoFullscreenChange={notifyVideoFullscreenChange}
                                    ></SlidePreview>
                                </div>
                            </div>
                            <div className="card-footer card-header-sm">
                                <Link target="blank" to={`/meeting/preview?id=1`}>Preview</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-2 h-100">
                        <div className="card h-100">
                            <div className="card-header card-header-sm" >
                                <i className="d-sm-none d-md-inline btn-sm-padding">Slides</i>
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

export default Player;

// <div>
//             <h1>This is Meeting {meetingId} and current slide is {currentSlideId}</h1>
//             <div><input id="slideId" name="slideId" value={currentSlideId} onChange={(event) => setCurrentSlideId(event.target.value)} /> <button onClick={notifySlideChange}>Change Slide</button></div>
//         </div>