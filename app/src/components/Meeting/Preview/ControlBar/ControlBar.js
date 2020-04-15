import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import './ControlBar.css';


const ControlBar = () => {

    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);

    const toggleVideo = () => {
        setIsVideo(!isVideo);
    }
    const toggleAudio = () => {
        setIsAudio(!isAudio);
    }

    return (
        <div>
            <div className="float-left"> Slide Title </div>
            <div className="float-right"> 
                <button className="btn btn-sm outline-primary" onClick={toggleAudio}><FontAwesomeIcon className="primary-color" icon={isAudio ? faMicrophone : faMicrophoneSlash} /></button>
                <button className="btn btn-sm outline-primary" onClick={toggleVideo}><FontAwesomeIcon className="primary-color" icon={isVideo ? faVideo : faVideoSlash} /></button>
            </div>
        </div>
    );
}

export default ControlBar;