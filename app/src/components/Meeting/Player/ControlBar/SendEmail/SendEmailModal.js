import React from 'react';

import './SendEmailModal.css';
import { Modal, Button, ListGroup, Col, Tab, Row, Sonnet, Card, Form } from 'react-bootstrap';
import EmailEditor from './EmailEditor/EmailEditor';

const SendEmailModal = ({ show, setShow }) => {

    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="send-email-title" centered
            show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="send-email-title">
                    Send Email
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tab.Container defaultActiveKey="#link1">
                    <Row>
                        <Col sm={3}>
                            <ListGroup>
                                <ListGroup.Item action href="#link1" className="text-truncate">
                                    Invitation Email
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2" className="text-truncate">
                                    Documents Email
                                </ListGroup.Item >
                                <ListGroup.Item action href="#link3" className="text-truncate">
                                    Thank You Email
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#link1">
                                    <EmailEditor
                                        defaultTo="doctor@doctors.com"
                                        defaultCc="supervisor@tranz.com"
                                        defaultSubject="Meeting Invitation"
                                        defaultBody={"Dear Doctor,\n\nPlease join meeting.\n\nhttps://vfield.tranz-life.com/meeting/preview/consent?id=1\n\nRegards,\nRepresentative"}
                                        onSend={() => setShow(false)}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                    <EmailEditor
                                        defaultTo="doctor@doctors.com"
                                        defaultCc="supervisor@tranz.com"
                                        defaultSubject="Documents Required"
                                        defaultBody={"Dear Doctor,\n\nPlease find attached documents.\n\nRegards,\nRepresentative"}
                                        onSend={() => setShow(false)}
                                    />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link3">
                                    <EmailEditor
                                        defaultTo="doctor@doctors.com"
                                        defaultCc="supervisor@tranz.com"
                                        defaultSubject="Thank you for your time"
                                        defaultBody={"Dear Doctor,\n\nWe really appreciate you time.\n\nRegards,\nRepresentative"}
                                        onSend={() => setShow(false)}
                                    />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={send}>
                    Send
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default SendEmailModal;