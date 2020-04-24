import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faEnvelope, faPowerOff, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import './ControlBar.css';
import SendEmailModal from './SendEmail/SendEmailModal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeedbackModal from './Feedback/FeedbackModal';
import ApiService from '../../../../services/api-service';


const ControlBar = ( { onEnd, users, onSelectUser }) => {

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
            <div className="float-left">
                {/* { slide 
                    ? <img src={slide.url ? ApiService.getBaseUrl() + slide.url : 'https://via.placeholder.com/50?text=Slide'} alt="Slide Preview" className="img-fluid rounded-circle" />
                    : null
                } */}
                <div onClick={() => {console.log('slides'); onSelectUser(null)}} className="float-left rounded-circle text-center bg-secondary align-items-center" style={{width: '2rem', height: '2rem', paddingTop: '.3rem'}}>
                    <FontAwesomeIcon size="xs" color="white" icon={faProjectDiagram} />
                </div>
                {
                    users
                        ? users.map(user => (<img src={'https://via.placeholder.com/50?text=User'} alt="U" className="rounded-circle" style={{width: '2rem'}} onClick={() => {console.log('user'); onSelectUser(user)}}/>))
                        : null
                }
            </div>
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