import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Preview.css';
import ApiService from '../../../services/api-service';
import MeetingService from '../../../services/meeting-service';
import SessionService from '../../../services/session-service';
import SlideThumbnail from '../SlideThumbnail/SlideThumbnail';
import SlidePreview from '../SlidePreview/SlidePreview';

let socket;

const Preview = ({ location }) => {

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
                console.log('slide-video-fullscreen-changed', slidePreview);
                slidePreview.current.videoFullscreen(isFullscreen);
            })
            socket.on('slide-video-seeked', ({ seconds}, callback) => {
                console.log('slide-video-seeked', seconds);
                slidePreview.current.seekVideo(seconds);
            })
        }
    }, []);

    const notifyPlayVideo = () => {
        console.log('notify play video', meetingId);
        socket.emit('slide-video-play', ({ meetingId }));
    }
    const notifyPauseVideo = () => {
        console.log('notify pause video', meetingId);
        socket.emit('slide-video-pause', ({ meetingId }));
    }
    const notifySeekVideo = (seconds) => {
        socket.emit('slide-video-seek', ({ meetingId, seconds }));
    }
    const notifyVideoFullscreenChange = (isFullscreen) => {
        socket.emit('slide-video-fullscreen-change', ({ meetingId, isFullscreen }));
    }
    
    return (
        <section style={{ padding: '0' }}>
            <div className="card">
                <div className="card-header">
                    <h6>Slide ({currentSlideId})</h6>
                </div>
                <div className="card-body">
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
                <div className="card-footer"></div>
            </div>

        </section>
    );
}

export default Preview;