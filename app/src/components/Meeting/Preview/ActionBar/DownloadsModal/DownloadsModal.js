import React from 'react';

import './DownloadsModal.css';
import { Modal, Button, Row, Card, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePowerpoint, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DownloadsModal = ({ show, setShow }) => {

    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="downloads-title" centered
            show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="downloads-title">
                    Downloads
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap">
                    <Link to="/download/study" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="orange" size="4x" icon={faFilePowerpoint} />
                            </Card.Body>
                            <Card.Footer>
                                Study to download
                            </Card.Footer>
                        </Card>
                    </Link>
                    <Link to="/download/study" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="red" size="4x" icon={faFilePdf} />
                            </Card.Body>
                            <Card.Footer>
                                Study to download
                                </Card.Footer>
                        </Card>
                    </Link>
                    <Link to="/download/study" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="red" size="4x" icon={faFilePdf} />
                            </Card.Body>
                            <Card.Footer>
                                Study to download
                                </Card.Footer>
                        </Card>
                    </Link>
                    <Link to="/download/study" target="blank" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="orange" size="4x" icon={faFilePowerpoint} />
                            </Card.Body>
                            <Card.Footer>
                                Study to download
                            </Card.Footer>
                        </Card>
                    </Link>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DownloadsModal;