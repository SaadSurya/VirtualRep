import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'
import { SLIDE_TYPE } from '../../../services/slide-service';
import ApiService from '../../../services/api-service';
import SurveyPreview from './SurveyPreview/SurveyPreview';

import './SlidePreview.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const SlidePreview = forwardRef(({ user, slide, slideState, onPlayVideo, onPauseVideo, onSeekVideo, onVideoFullscreenChange, onSlideStateChange }, ref) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [userVideoFullscreen, setUserVideoFullscreen] = useState(false);
    const [showUserVideo, setShowUserVideo] = useState(false);
    //const [slideTemplate, setSlideTemplate] = useState((<div>No preview available</div>));
    //const [currentSlideState, setCurrentSlideState] = useState(slideState);

    let seeked = false;
    let isVideo = false;
    //console.log("Slide Preview Rendered");
    let videoPlayer = useRef(null);
    //let cameraPlayer = useRef(null);

    useImperativeHandle(ref, () => ({

        // changeSlideState: ({ slideId, slideState }) => {
        //     console.log(slideId, slideState);
        //     const slide = meeting.slides.find(slide => slide.id == slideId);
        //     if (slide) {
        //         slide.state = slideState;
        //     }
        // },
        playVideo: (doNotify) => {
            console.log('Play Video');
            ref.current.donotNotifyPlay = true;
            setVideoPlaying(true);
        },
        pauseVideo: (doNotify) => {
            console.log('Pause Video');
            ref.current.donotNotifyPause = true;
            setVideoPlaying(false);
        },
        seekVideo: (seconds) => {
            console.log('Seek Video', seconds);
            console.log(ref);
            ref.current.donotNotifySeek = true;
            videoPlayer.current.seekTo(seconds, 'seconds')
        },
        videoFullscreen: (isFullscreen) => {
            console.log('Fullscreen changed', isFullscreen);
            console.log(videoPlayer.current);
            if (isFullscreen) {
                screenfull.request(videoPlayer.current.wrapper).then(() => {
                    console.log('fullscreen worked');
                    return true;
                }, (error) => {
                    console.log('Failed to fullscreen.');
                    return false;
                });
            } else {
                screenfull.exit().then(() => {
                    console.log('fullscreen exit worked');
                    return true;
                }, (error) => {
                    console.log('Failed to exit fullscreen.');
                })
            }
        }
    }))

    useEffect(() => {
        if (user != null) {
            setShowUserVideo(true);
            // console.log(cameraPlayer.current)
            // if (cameraPlayer.current) {
            //     cameraPlayer.current.srcObject = user.stream;
            //     console.log('streaming...', user.stream)
            // }
        }
    }, [user]);

    let slideTemplate = (<div>Loading, Please Wait...</div>);
    //useEffect(() => {
    //console.log(slide);
    if (user && userVideoFullscreen) {
        slideTemplate = (
            <div className="stretched">
                <video ref={video => {if(video) {video.srcObject = user.stream}}} autoPlay muted={true} id="large-video" className="stretched">
                        </video>
                <Button size="sm" variant="outline-secondary" className="fullscreen-button shadow"
                    onClick={() => setUserVideoFullscreen(false)}>
                    <FontAwesomeIcon icon={faSquareFull} />
                </Button>
            </div>
        )
    } else if (slide) {
        let slideUrl = ApiService.getBaseUrl() + slide.url;
        switch (slide.type) {
            default:
            case SLIDE_TYPE._IMAGE:
                slideTemplate = (
                    <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={slideUrl} alt="Slide Preview" />
                );
                break;
            case SLIDE_TYPE._VIDEO:
                isVideo = true;
                slideTemplate = (
                    <ReactPlayer
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                        ref={videoPlayer}
                        url={slideUrl}
                        controls
                        playing={videoPlaying}
                        onReady={() => {
                            // console.log('calling vp setter', videoPlayerSetter)
                            //     videoPlayerSetter(videoPlayer);
                            if (slide.videoPlayed && !seeked) {
                                seeked = true;
                                videoPlayer.current.seekTo(slide.videoPlayed, 'seconds');
                            }
                        }}
                        onSeek={
                            (seconds) => {
                                if (videoPlaying) {
                                    ref.current.donotNotifyPause = true;
                                    ref.current.donotNotifyPlay = true;
                                }
                                seeked = true;
                                if (!ref.current.donotNotifySeek) {
                                    onSeekVideo(seconds);
                                } else {
                                    ref.current.donotNotifySeek = false;
                                }
                            }
                        }
                        onProgress={({ played, playedSeconds }) => slide.videoPlayed = playedSeconds}
                        onPlay={() => {
                            console.log('onPlay start', ref.current.donotNotifyPlay);
                            if (!ref.current.donotNotifyPlay) {
                                onPlayVideo();
                            } else {
                                ref.current.donotNotifyPlay = false;
                            }
                            console.log('onPlay end', ref.current.donotNotifyPlay);
                        }}
                        onPause={() => {
                            console.log('onPause start', ref.current.donotNotifyPause);
                            if (!ref.current.donotNotifyPause) {
                                onPauseVideo();
                            } else {
                                ref.current.donotNotifyPause = false;
                            }
                            console.log('onPause end', ref.current.donotNotifyPause);
                        }}></ReactPlayer>
                );
                break;
            case SLIDE_TYPE._SURVEY:

                slideTemplate = (
                    <SurveyPreview key={slide.id} survey={slide.survey} currentSurveyState={slideState} onSlideStateChange={onSlideStateChange}></SurveyPreview>
                );
        }
    }
    //}, [slide]);

    useEffect(() => {
        // //setCurrentSlideState(slideState);
        // console.log(slideTemplate.props);
        // if(slideTemplate.props.surveyState) {
        //     slideTemplate.props.surveyState = slideState
        // }
        // console.log(slideTemplate.props);
        // setSlideTemplate(slideTemplate);
    }, [slideState]);

    useEffect(() => {
        if (isVideo) {
            const fullScreenListener = (e) => {
                var isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                console.log('isfullscreen: ', isFullscreen);
                onVideoFullscreenChange(isFullscreen);
            }
            document.addEventListener("fullscreenchange", fullScreenListener);
            document.addEventListener("mozfullscreenchange", fullScreenListener);
            document.addEventListener("webkitfullscreenchange", fullScreenListener);
            document.addEventListener("msfullscreenchange", fullScreenListener);
            return () => {
                console.log('removed fullscreen event handler')
                document.removeEventListener("fullscreenchange", fullScreenListener);
                document.removeEventListener("mozfullscreenchange", fullScreenListener);
                document.removeEventListener("webkitfullscreenchange", fullScreenListener);
                document.removeEventListener("msfullscreenchange", fullScreenListener);
            }
        }
    }, [slide])

    return (
        <div className="row h-100 justify-content-center align-items-center" style={{ position: "relative" }}>
            {slideTemplate}
            {
                user && showUserVideo && !userVideoFullscreen
                    ? <div className="user-video-small shadow">
                        <video ref={video => {if(video) {video.srcObject = user.stream}}} autoPlay muted={true} id="small-video" className="stretched">
                        </video>
                        {/* <span className="text-white-50 text-truncate ">&bnsp;{user.name}</span> */}
                        {/* <Button size="xs" variant="outline-secondary" className="cross-button"
                        onClick={() => setShowUserVideo(false)}>
                    <FontAwesomeIcon icon={faWindowClose} />
                    </Button> */}
                        <Button size="xs" variant="outline-secondary" className="fullscreen-button shadow"
                            onClick={() => setUserVideoFullscreen(true)}>
                            <FontAwesomeIcon icon={faSquareFull} />
                        </Button>
                    </div>
                    : null
            }
            
        </div>
    )
})

export default SlidePreview;