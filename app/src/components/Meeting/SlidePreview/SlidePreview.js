import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'
import { SLIDE_TYPE } from '../../../services/slide-service';
import ApiService from '../../../services/api-service';
import SurveyPreview from './SurveyPreview/SurveyPreview';

const SlidePreview = forwardRef(({ meeting, currentSlideId, onPlayVideo, onPauseVideo, onSeekVideo, onVideoFullscreenChange }, ref) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    let seeked = false;
    let isVideo = false;

    let videoPlayer = useRef(null);
    useImperativeHandle(ref, () => ({
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
    let slideTemplate = (<div>No preview available</div>);

    if (currentSlideId && meeting && meeting.slides) {
        const slide = meeting.slides.find(slide => slide.id === currentSlideId) || { type: '' };
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
                    <SurveyPreview survey={slide.survey}></SurveyPreview>
                );
        }
    }

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
    }, [meeting, currentSlideId])

    return (
        <div className="row h-100 justify-content-center align-items-center">
            {slideTemplate}
        </div>
    )
})

export default SlidePreview;