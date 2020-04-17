import React from 'react';
import './FeedbackModal.css';
import { Modal, Button, ListGroup, Col, Tab, Row, Sonnet, Card, Form } from 'react-bootstrap';
import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeedbackModal = ({ show, setShow }) => {

    const submit = () => {
        endMeeting();
    };

    const endMeeting = () => {
        //if (window.confirm('Are you sure to end meeting?')) {
            window.location.href = '/meeting/preview/thankyou';
        //}
    }
    return (
        <Modal size="lg" aria-labelledby="feedback-title" centered
            show={show} onHide={() => setShow(false)}
            dialogClassName="modal-dialog-scrollable">
            <Modal.Header>
                <Modal.Title id="feedback-title">
                    Feedback
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="forms">
                <div className="text-center">
                    <Form>
                        <Form.Group >
                            <Form.Label>
                                <h6>Please rate quality of call</h6>
                            </Form.Label>
                            <div><Rating 
                                    emptySymbol={<FontAwesomeIcon size="2x" color="black"   icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon size="2x" className="primary-color" icon={faStar} />} /></div>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>
                                <h6>Technology friendliness</h6>
                            </Form.Label>
                            <div><Rating 
                                    emptySymbol={<FontAwesomeIcon size="2x" color="black"   icon={faStar} />}
                                    fullSymbol={<FontAwesomeIcon size="2x" className="primary-color" icon={faStar} />} /></div>
                        </Form.Group>

                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer className="text-center">
                <Button variant="primary" onClick={submit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default FeedbackModal;