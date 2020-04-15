import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faEnvelope, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import './ControlBar.css';
import SendEmailModal from './SendEmail/SendEmailModal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ControlBar = () => {

    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [showSendEmail, setShowSendEmail] = useState(false);

    const toggleVideo = () => {
        setIsVideo(!isVideo);
    }
    const toggleAudio = () => {
        setIsAudio(!isAudio);
    }
    const endMeeting = () => {
        if(window.confirm('Are you sure to end meeting?')) {
            window.location.href = '/meeting/logs';
        }
    }

    return (
        <div>
            <div className="float-left"> Slide Title </div>
            <div className="float-right"> 
                <Button size="sm" variant="outline-primary" onClick={() => setShowSendEmail(true)}><FontAwesomeIcon icon={faEnvelope} /></Button>
                <SendEmailModal show={showSendEmail} setShow={setShowSendEmail} />
                <Button size="sm" variant="outline-primary" onClick={toggleAudio}><FontAwesomeIcon icon={isAudio ? faMicrophone : faMicrophoneSlash} /></Button>
                <Button size="sm" variant="outline-primary" onClick={toggleVideo}><FontAwesomeIcon icon={isVideo ? faVideo : faVideoSlash} /></Button>
                <Button size="sm" variant="danger" onClick={endMeeting}><FontAwesomeIcon  icon={faPowerOff} /></Button>
                
            </div>
        </div>
    );
}

export default ControlBar;