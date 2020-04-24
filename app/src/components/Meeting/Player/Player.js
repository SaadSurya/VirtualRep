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
import ControlBar from './ControlBar/ControlBar';

let socket;

var peerConnection = window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.msRTCPeerConnection;

var sessionDescription = window.RTCSessionDescription ||
    window.mozRTCSessionDescription ||
    window.webkitRTCSessionDescription ||
    window.msRTCSessionDescription;

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;


var pc = new peerConnection({
    iceServers: [{
        url: "stun:stun.services.mozilla.com",
        username: "somename",
        credential: "somecredentials"
    }]
});


const Player = ({ location }) => {

    const [meetingId, setMeetingId] = useState("");
    const [meeting, setMeeting] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentSlideState, setCurrentSlideState] = useState({});
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const meetingRef = useRef(null);
    const currentSlideRef = useRef(null);
    const currentSlideStateRef = useRef({});

    meetingRef.current = meeting;
    currentSlideRef.current = currentSlide;
    currentSlideStateRef.current = currentSlideState;

    const ENDPOINT = ApiService.getBaseUrl();

    const slidePreview = useRef(null);

    useEffect(() => {

        const { id } = queryString.parse(location.search);
        setMeetingId(id);

        if (!socket) {
            socket = io(ENDPOINT);
            socket.emit('join', { username: (SessionService.getSession() || {}).username || 'anonymous', meetingId: id }, (joinedMeeting) => {
                let slide = joinedMeeting.slides.find(slide => slide.isCurrent);
                slide = (slide ? slide : joinedMeeting.slides[0]);
                setUsers(joinedMeeting.users);
                setCurrentSlide(slide);
                setCurrentSlideState(slide.state || {});
                setMeeting(joinedMeeting);
            });
            socket.on('notification', ({ text }) => {
                console.log(text);
                //alert(text);
            })
            socket.on('slide-changed', ({ currentSlideId, slideState }, callback) => {
                console.log('slide-changed', currentSlideId);
                meetingRef.current.slides.forEach(slide => {
                    if (slide.id == currentSlideId) {
                        slide.isCurrent = true;
                        slide.state = slideState || {};
                        setCurrentSlide(slide);
                        setCurrentSlideState(slide.state);
                    } else {
                        slide.isCurrent = false;
                    }
                });
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
            socket.on('slide-state-changed', ({ slideId, slideState }) => {
                console.log('slide-state-changed', slideId, slideState);
                setCurrentSlideState(slideState || {})
                // const slide = meeting.slides.find(slide => slide.id == slideId);
                // if (slide) {
                //     slide.state = slideState;

                // }
            })
            socket.on('offer-made', function (data) {
                //offer = data.offer;

                pc.setRemoteDescription(new sessionDescription(data.offer), function () {
                    pc.createAnswer(function (answer) {
                        pc.setLocalDescription(new sessionDescription(answer), function () {
                            console.log('MAKE ANSWER');
                            socket.emit('make-answer', {
                                answer: answer,
                                to: data.socket
                            });
                        }, (err) => console.log(err));
                    }, (err) => console.log(err));
                }, (err) => console.log(err));

            });
            //var answersFrom = {}, offer;

            socket.on('answer-made', function (data) {
                pc.setRemoteDescription(new sessionDescription(data.answer), function () {
                    createOffer(data.socket);
                    // document.getElementById(data.socket).setAttribute('class', 'active');
                    // if (!answersFrom[data.socket]) {
                    //     createOffer(data.socket);
                    //     answersFrom[data.socket] = true;
                    // }
                }, (err) => console.log(err));
            });
        }
    }, []);

    useEffect(() => {
        if (currentSlide && currentSlide.state)
            setCurrentSlideState(currentSlide.state);
    }, [currentSlide]);

    useEffect(() => {
        if (currentSlideState && currentSlide)
            currentSlide.state = currentSlideState;
        setCurrentSlide(currentSlide);
    }, [currentSlideState]);

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
        setCurrentSlideState(slideState);
        console.log('notify slide state change called.');
        socket.emit('slide-state-change', { meetingId, slideId: currentSlide.id, slideState }, (response) => {
            console.log(response);
        });
    }
    const notifyMeetingEnd = () => {
        socket.emit('meeting-end', { meetingId }, (response) => {
            console.log(response);
        });
    }
    const selectSlide = (slide) => {
        setCurrentSlide(slide);
        notifySlideChange(slide.id);
    }

    const createOffer = (id) => {
        pc.createOffer((offer) => {
            pc.setLocalDescription(new sessionDescription(offer), () => {
                socket.emit('make-offer', { offer, id });
            }, (err) => console.log(err))
        }, (err) => console.log(err));
    }

    return (
        <section style={{ height: 'calc(100vh - 65px)' }}>
            <div className="container-fluid h-100" style={{ padding: '1rem 1rem' }}>
                <div className="row h-100">
                    <div className="col-md-10 col-sm-10 h-100">
                        <div className="card h-100">
                            <div className="card-header card-header-sm">
                                <ControlBar onEnd={notifyMeetingEnd} slide={currentSlide} users={users} onSelectUser={setCurrentUser} />
                            </div>
                            <div className="card-body">
                                <div className="container h-100">
                                    <SlidePreview
                                        ref={slidePreview}
                                        user={currentUser}
                                        slide={currentSlide}
                                        slideState={currentSlideState}
                                        onSlideStateChange={notifySlideStateChange}
                                        onPlayVideo={notifyPlayVideo}
                                        onPauseVideo={notifyPauseVideo}
                                        onSeekVideo={notifySeekVideo}
                                        onVideoFullscreenChange={notifyVideoFullscreenChange}
                                    ></SlidePreview>
                                </div>
                            </div>
                            <div className="card-footer card-header-sm">
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
                                                <SlideThumbnail key={slide.id} slide={slide} selectSlide={selectSlide} isSelected={currentSlide.id == slide.id}></SlideThumbnail>
                                            )
                                            : 'loading...'
                                    }
                                </div>
                            </Scrollbars>
                            <div className="card-footer card-header-sm">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Player;
