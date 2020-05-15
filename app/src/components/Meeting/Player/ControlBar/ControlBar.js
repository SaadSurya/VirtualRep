import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash, faEnvelope, faPowerOff, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'
import './ControlBar.css';
import SendEmailModal from './SendEmail/SendEmailModal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeedbackModal from './Feedback/FeedbackModal';
import ApiService from '../../../../services/api-service';
//import adapter from 'webrtc-adapter';


const ControlBar = ({ onEnd, users, currentUser, onSelectUser, setUsers }) => {

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

    const extractInitials = (name) => {
        let initials = name.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    }

    useEffect(() => {
        if (users) {
            const thisUser = users.find(u => u.isThis);
            if (thisUser) {
                if (!thisUser.stream) {
                    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(
                        stream => {
                            stream.getTracks().forEach(track => {
                                if (track.kind === 'video') {
                                    track.enabled = isVideo;
                                } else if (track.kind === 'audio') {
                                    track.enabled = isAudio;
                                }
                            });
                            thisUser.stream = stream;
                            setUsers([...users]);
                        },
                        error => {
                            console.error(error);
                        }
                    )
                } else {
                    thisUser.stream.getTracks().forEach(track => {
                        if (track.kind === 'video') {
                            track.enabled = isVideo;
                        } else if (track.kind === 'audio') {
                            track.enabled = isAudio;
                        }
                    });
                }
            }
        }

    }, [isVideo, isAudio])

    return (
        <div>
            <div className="float-left">
                {/* { slide 
                    ? <img src={slide.url ? ApiService.getBaseUrl() + slide.url : 'https://via.placeholder.com/50?text=Slide'} alt="Slide Preview" className="img-fluid rounded-circle" />
                    : null
                } */}
                <div onClick={() => { onSelectUser(null) }} className="float-left rounded-circle text-center bg-secondary align-items-center" style={{ width: '2rem', height: '2rem', paddingTop: '.3rem' }}>
                    <FontAwesomeIcon size="xs" color="white" icon={faProjectDiagram} />
                </div>
                {
                    users
                        ? users.map(user => (<img key={user.socketId} src={`https://via.placeholder.com/50?text=${extractInitials(user.name)}`} alt="U" className={'rounded-circle' + (currentUser === user ? ' shadow selected-user' : '')} style={{ width: '2rem' }} onClick={() => { onSelectUser(user) }} />))
                        : null
                }
            </div>
            <div className="float-right">
                <Button size="sm" variant="outline-primary" onClick={() => setShowSendEmail(true)}><FontAwesomeIcon icon={faEnvelope} /></Button>
                <SendEmailModal show={showSendEmail} setShow={setShowSendEmail} />
                <Button size="sm" variant="outline-primary" onClick={toggleAudio}><FontAwesomeIcon icon={isAudio ? faMicrophone : faMicrophoneSlash} /></Button>
                <Button size="sm" variant="outline-primary" onClick={toggleVideo}><FontAwesomeIcon icon={isVideo ? faVideo : faVideoSlash} /></Button>
                <Button size="sm" variant="danger" onClick={() => setShowFeedback(true)}><FontAwesomeIcon icon={faPowerOff} /></Button>
                <FeedbackModal show={showFeedback} setShow={setShowFeedback} onSubmit={onEnd} />
            </div>
        </div>
    );
}

export default ControlBar;