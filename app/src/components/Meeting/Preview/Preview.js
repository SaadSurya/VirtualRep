import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Preview.css';
import ApiService from '../../../services/api-service';
import SessionService from '../../../services/session-service';
import SlidePreview from '../SlidePreview/SlidePreview';
import { Button } from 'react-bootstrap';
import ActionBar from './ActionBar/ActionBar';
import ControlBar from './ControlBar/ControlBar';
import FeedbackModal from './FeedbackModal/FeedbackModal';

let socket;

const Preview = ({ location }) => {
    const [showFeedback, setShowFeedback] = useState(false);
    
    const [meetingId, setMeetingId] = useState("");
    const [meeting, setMeeting] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentSlideState, setCurrentSlideState] = useState({});
    
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
                setCurrentSlide(slide);
                setCurrentSlideState(slide.state || {});
                setMeeting(joinedMeeting);
            });
            socket.on('notification', ({ text }) => {
                console.log(text);
                //alert(text);
            })
            socket.on('slide-changed', ({ currentSlideId, slideState}, callback) => {
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
            socket.on('meeting-ended', ({}) => {
                console.log('meeting-ended');
                setShowFeedback(true);
            })
        }
    }, []);

    useEffect(() => {
        if(currentSlide && currentSlide.state)
            setCurrentSlideState(currentSlide.state);
    }, [currentSlide]);

    useEffect(() => {
        if(currentSlideState && currentSlide)
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

    const notifySlideStateChange = (slideState) => {
        setCurrentSlideState(slideState);
        console.log('notify slide state change called.');
        socket.emit('slide-state-change', { meetingId, slideId: currentSlide.id, slideState }, (response) => {
            console.log(response);
        });
    }

    
    return (
        <section style={{ padding: '0' }}>
            <div className="card">
                <div className="card-header">
                    <ControlBar />
                </div>
                <div className="card-body">
                    <SlidePreview
                        ref={slidePreview}
                        slide={currentSlide}
                        slideState={currentSlideState}
                        onSlideStateChange={notifySlideStateChange}
                        onPlayVideo={notifyPlayVideo}
                        onPauseVideo={notifyPauseVideo}
                        onSeekVideo={notifySeekVideo}
                        onVideoFullscreenChange={notifyVideoFullscreenChange}
                    ></SlidePreview>
                </div>
                <div className="card-footer">
                    <ActionBar />
                </div>
            </div>
            <FeedbackModal show={showFeedback} setShow={setShowFeedback} />
        </section>
    );
}

export default Preview;