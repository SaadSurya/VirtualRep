import React from 'react';

import './MedicalSurveyModal.css';
import { Modal, Button } from 'react-bootstrap';

const MedicalSurveyModal = ({ show, setShow }) => {

    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="medical-survey-title" centered
            show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="medical-survey-title">
                    Medical Survey
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={submit}>
                    submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MedicalSurveyModal;