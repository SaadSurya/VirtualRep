import React from 'react';

import './RequestFormModal.css';
import { Modal, Button } from 'react-bootstrap';

const RequestFormModal = ({ show, setShow }) => {

    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="request-form-title" centered
            show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title id="request-form-title">
                    Request Form
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

export default RequestFormModal;