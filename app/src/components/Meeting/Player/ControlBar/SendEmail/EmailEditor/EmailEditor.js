import React, { useState } from 'react';
import { Button, Card, Form, Row, Col, Spinner } from 'react-bootstrap';

import './EmailEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import EmailService from '../../../../../../services/email-service';

const EmailEditor = ({ defaultTo, defaultCc, defaultSubject, defaultBody, onSend }) => {
    const [to, setTo] = useState(defaultTo);
    const [cc, setCc] = useState(defaultCc);
    const [subject, setSubject] = useState(defaultSubject);
    const [body, setBody] = useState(defaultBody);
    const [sending, setSending] = useState(false);

    const sendEmail = (event) => {
        event.preventDefault();
        setSending(true)
        EmailService.sendEmail(
            {
                to,
                cc,
                subject,
                body
            }
        ).then(response => {
            alert(response.data);
            onSend();
            setSending(false);
        }).catch(error => {
            alert('Failed to send email!');
            console.log(error);
            setSending(false);
        })
    }

    return (
        <Card>

            <Card.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">To: </Form.Label>
                        <Col sm="7">
                            <Form.Control type="email" size="sm" value={to} onChange={(event) => setTo(event.target.value)} />
                        </Col>
                        <Col sm="3">
                            <div className="float-right">
                                <Button size="sm" variant="outline-primary" onClick={sendEmail} disabled={sending}>
                                    {
                                        sending 
                                        ? (<span><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /> Sending...</span>)
                                        : (<span><FontAwesomeIcon icon={faPaperPlane} /> Send</span>)
                                    }
                                </Button>
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">CC: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" size="sm" value={cc} onChange={(event) => setCc(event.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">Subject: </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" size="sm" value={subject} onChange={(event) => setSubject(event.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows="10" value={body} onChange={(event) => setBody(event.target.value)}/>
                    </Form.Group>
                </Form>
            </Card.Body>

        </Card>
    );
}

export default EmailEditor;