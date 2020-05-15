import React, { useState, useEffect, useRef, cloneElement } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
//import adapter from 'webrtc-adapter';

import './Player.css';
import SessionService from '../../../services/session-service';
import MeetingService from '../../../services/meeting-service';
import SlideThumbnail from '../SlideThumbnail/SlideThumbnail';
import ApiService from '../../../services/api-service';
import Scrollbars from 'react-custom-scrollbars';
import SlidePreview from '../SlidePreview/SlidePreview';
import { Link } from 'react-router-dom';
import ControlBar from './ControlBar/ControlBar';

let socket, peerConnections = {}, receivingPeerConnections = {};

// var peerConnection = window.RTCPeerConnection ||
//     window.mozRTCPeerConnection ||
//     window.webkitRTCPeerConnection ||
//     window.msRTCPeerConnection;

// var sessionDescription = window.RTCSessionDescription ||
//     window.mozRTCSessionDescription ||
//     window.webkitRTCSessionDescription ||
//     window.msRTCSessionDescription;

/* navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    navigator.mediaDevices.getUserMedia; 
 */

const Player = ({ location }) => {

    const [meetingId, setMeetingId] = useState("");
    const [meeting, setMeeting] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentSlideState, setCurrentSlideState] = useState({});
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [streamAdded, setStreamAdded] = useState(false);

    const meetingRef = useRef(null);
    const currentSlideRef = useRef(null);
    const currentSlideStateRef = useRef({});
    const usersRef = useRef([]);
    const currentUserRef = useRef(null);

    meetingRef.current = meeting;
    currentSlideRef.current = currentSlide;
    currentSlideStateRef.current = currentSlideState;
    usersRef.current = users;
    currentUserRef.current = currentUser;

    const ENDPOINT = ApiService.getBaseUrl();

    const slidePreview = useRef(null);


    useEffect(() => {
        /* if (!streamAdded) {
            const user = users.find(u => u.isThis);
            if (user && user.stream) {
                setStreamAdded(true);
                Object.keys(peerConnections).forEach((key) => {
                    user.stream.getTracks().forEach(track => {
                        peerConnections[key].addTrack(track, user.stream);
                        console.log('adding track', track);
                    })
                });
                console.log(peerConnections);
            }
        } */
        const thisUser = users.find(u => u.isThis);
        if (thisUser && thisUser.stream) {
            users.forEach(user => {
                if (!peerConnections[user.socketId]) {
                    initiatePeerConnection(user.socketId, thisUser.stream)
                }
            })
        }

    }, [users]);

    useEffect(() => {

        const { id } = queryString.parse(location.search);
        setMeetingId(id);

        if (!socket) {
            socket = io(ENDPOINT);
            socket.emit('join', { username: (SessionService.getSession() || {}).username || 'anonymous', meetingId: id }, (joinedMeeting) => {
                let slide = joinedMeeting.slides.find(slide => slide.isCurrent);
                slide = (slide ? slide : joinedMeeting.slides[0]);
                const thisUser = joinedMeeting.users.find(u => u.socketId === socket.id);
                thisUser.isThis = true;
                if (thisUser.socketId === joinedMeeting.initiator.socketId) {
                    thisUser.isInitiator = true;
                }
                setUsers(joinedMeeting.users);
                setCurrentUser(thisUser);
                setCurrentSlide(slide);
                setCurrentSlideState(slide.state || {});
                setMeeting(joinedMeeting);
            });
            socket.on('joined', ({ user }) => {
                setUsers([...usersRef.current, user]);
            });
            socket.on('left', ({ user }) => {
                const leftUser = usersRef.current.find(u => u.socketId === user.socketId);
                usersRef.current.splice(usersRef.current.indexOf(leftUser), 1);
                if (currentUserRef.current === leftUser) {
                    setCurrentUser(null);
                }
                setUsers([...usersRef.current]);
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
            socket.on('offer-made', function ({ offer, by }) {
                //offer = data.offer;
                let peerConnection;
                if (!receivingPeerConnections[by]) {
                    peerConnection = new RTCPeerConnection({
                        iceServers: [
                            { urls: ['stun:stun.l.google.com:19302'] },
                            { urls: ['stun:stun1.l.google.com:19302'] },
                            { urls: ['stun:stun2.l.google.com:19302'] },
                            { urls: ['stun:stun3.l.google.com:19302'] },
                            { urls: ['stun:stun4.l.google.com:19302'] },
                            {
                                "urls": [
                                    "turn:13.250.13.83:3478?transport=udp"
                                ],
                                "username": "YzYNCouZM1mhqhmseWk6",
                                "credential": "YzYNCouZM1mhqhmseWk6"
                            }
                        ]
                    });
                } else {
                    peerConnection = receivingPeerConnections[by];
                }
                peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(function () {
                    peerConnection.createAnswer().then(function (answer) {
                        peerConnection.setLocalDescription(new RTCSessionDescription(answer)).then(function () {
                            socket.emit('make-answer', {
                                answer: answer,
                                to: by
                            });
                        }, (err) => console.log(err));
                    }, (err) => console.log(err));
                }, (err) => console.log(err));
                peerConnection.ontrack = function (e) {
                    const user = usersRef.current.find(u => u.socketId === by);
                    user.stream = e.streams[0];
                    setUsers([...usersRef.current]);
                    //console.log(e.streams[0]); 
                }
                peerConnection.onicecandidate = (event) => {
                    if (!event.candidate) return;
                    socket.emit('ice-candidate', { candidate: event.candidate, to: by });
                }
                receivingPeerConnections[by] = peerConnection;
            });

            socket.on('answer-made', function ({ answer, by }) {
                const peerConnection = peerConnections[by];
                peerConnection.setRemoteDescription(new RTCSessionDescription(answer)).then(function () {

                }, (err) => console.log(err));
            });

            socket.on('ice-candidate', function ({ candidate, by }) {
                const peerConnection = receivingPeerConnections[by] || peerConnections[by];
                peerConnection.addIceCandidate(candidate);
                console.log(candidate)
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

    const initiatePeerConnection = (socketId, stream) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                { urls: ['stun:stun.l.google.com:19302'] },
                { urls: ['stun:stun1.l.google.com:19302'] },
                { urls: ['stun:stun2.l.google.com:19302'] },
                { urls: ['stun:stun3.l.google.com:19302'] },
                { urls: ['stun:stun4.l.google.com:19302'] },
                {
                    "urls": [
                        "turn:13.250.13.83:3478?transport=udp"
                    ],
                    "username": "YzYNCouZM1mhqhmseWk6",
                    "credential": "YzYNCouZM1mhqhmseWk6"
                }
            ]
        });
        createOffer(peerConnection, socketId, stream);
        peerConnection.ontrack = function (e) {
            const user = usersRef.current.find(u => u.socketId === socketId);
            user.stream = e.streams[0];
            setUsers([...usersRef.current]);
            //console.log(e.streams[0]);
        }
        peerConnection.onicecandidate = (event) => {
            if (!event.candidate) return;
            socket.emit('ice-candidate', { candidate: event.candidate, to: socketId });
        }
        peerConnections[socketId] = peerConnection;
    }

    const createOffer = (peerConnection, socketId, stream) => {
        stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
            console.log('adding track', track);
        })
        peerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveVideo: true }).then((offer) => {
            peerConnection.setLocalDescription(new RTCSessionDescription(offer)).then(() => {
                socket.emit('make-offer', { offer, to: socketId });
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
                                <div className="audios">
                                    {users
                                        ? users.map(user =>
                                            !user.isThis && user.stream && user.stream
                                                ? (<video ref={video =>
                                                    video && user.stream
                                                        ? video.srcObject = user.stream
                                                        : null
                                                } autoPlay muted={false} />
                                                )
                                                : null
                                        )
                                        : null
                                    }
                                </div>
                                <ControlBar
                                    onEnd={notifyMeetingEnd}
                                    slide={currentSlide}
                                    users={users}
                                    currentUser={currentUser}
                                    onSelectUser={setCurrentUser}
                                    setUsers={setUsers} />
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
