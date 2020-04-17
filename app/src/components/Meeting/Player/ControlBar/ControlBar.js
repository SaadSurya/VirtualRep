import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faEnvelope, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import './ControlBar.css';
import SendEmailModal from './SendEmail/SendEmailModal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeedbackModal from './Feedback/FeedbackModal';


const ControlBar = ( { onEnd }) => {

    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [showSendEmail, setShowSendEmail] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

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
                <Button size="sm" variant="outline-primary" onClick={() => setShowSendEmail(true)}><FontAwesomeIcon icon={faEnvelope} /></Button>
                <SendEmailModal show={showSendEmail} setShow={setShowSendEmail} />
                <Button size="sm" variant="outline-primary" onClick={toggleAudio}><FontAwesomeIcon icon={isAudio ? faMicrophone : faMicrophoneSlash} /></Button>
                <Button size="sm" variant="outline-primary" onClick={toggleVideo}><FontAwesomeIcon icon={isVideo ? faVideo : faVideoSlash} /></Button>
                <Button size="sm" variant="danger" onClick={() => setShowFeedback(true)}><FontAwesomeIcon  icon={faPowerOff} /></Button>
                <FeedbackModal show={showFeedback} setShow={setShowFeedback} onSubmit={onEnd} />
            </div>
        </div>
    );
}

export default ControlBar;