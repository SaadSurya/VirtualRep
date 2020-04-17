import React from 'react';

import './DownloadsModal.css';
import { Modal, Button, Row, Card, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePowerpoint, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ApiService from '../../../../../services/api-service';

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
                    <a href={ApiService.getBaseUrl() + '/documents/company1/studies/910811_slides.pptx'} target="blank" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="orange" size="4x" icon={faFilePowerpoint} />
                            </Card.Body>
                            <Card.Footer>
                                Personalizing Therapy in Knee Osteoarthritis
                            </Card.Footer>
                        </Card>
                    </a>
                    <a href={ApiService.getBaseUrl() + '/documents/company1/studies/922920_slides.pptx'} target="blank" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="red" size="4x" icon={faFilePdf} />
                            </Card.Body>
                            <Card.Footer>
                                High-Sensitivity Troponin in Clinical Practice
                            </Card.Footer>
                        </Card>
                    </a>
                    <a href={ApiService.getBaseUrl() + '/documents/company1/studies/926202_slides.pptx'} target="blank" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="red" size="4x" icon={faFilePdf} />
                            </Card.Body>
                            <Card.Footer>
                                A Case-Based Discussion
                            </Card.Footer>
                        </Card>
                    </a>
                    {/* <Link to="/download/study" target="blank" className="p-1">
                        <Card style={{ maxWidth: '12rem' }} >
                            <Card.Body className="text-center">
                                <FontAwesomeIcon color="orange" size="4x" icon={faFilePowerpoint} />
                            </Card.Body>
                            <Card.Footer>
                                Study to download
                            </Card.Footer>
                        </Card>
                    </Link> */}
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