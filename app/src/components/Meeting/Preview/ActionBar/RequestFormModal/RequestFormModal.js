import React from 'react';

import './RequestFormModal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const RequestFormModal = ({ show, setShow }) => {
    const labelColWidth = 4;
    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="request-form-title" centered
            show={show} onHide={() => setShow(false)}
            dialogClassName="modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title id="request-form-title">
                    Request Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="forms">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <Form>

                            <h4>Endrol</h4>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Request Type
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Check id="endrolRequestType1" type="radio" name="endrolRequestType" label="Sample" />
                                    <Form.Check id="endrolRequestType2" type="radio" name="endrolRequestType" label="CME" />
                                    <Form.Check id="endrolRequestType3" type="radio" name="endrolRequestType" label="Conference" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Strength
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Strength" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Pack Size
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Pack Size" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Quantity
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="number" placeholder="Quantity" />
                                </Col>
                            </Form.Group>
                            <div className="line"></div>
                            <h4>Froxim</h4>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Request Type
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Check id="froximRequestType1" type="radio" name="froximRequestType" label="Sample" />
                                    <Form.Check id="froximRequestType2" type="radio" name="froximRequestType" label="CME" />
                                    <Form.Check id="froximRequestType3" type="radio" name="froximRequestType" label="Conference" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Strength
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Strength" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Pack Size
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Pack Size" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Quantity
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="number" placeholder="Quantity" />
                                </Col>
                            </Form.Group>
                            <div className="line"></div>
                            <h4>Brilique</h4>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Request Type
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Check id="briliqueRequestType1" type="radio" name="briliqueRequestType" label="Sample" />
                                    <Form.Check id="briliqueRequestType2" type="radio" name="briliqueRequestType" label="CME" />
                                    <Form.Check id="briliqueRequestType3" type="radio" name="briliqueRequestType" label="Conference" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Strength
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Strength" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Pack Size
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="text" placeholder="Pack Size" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} >
                                <Form.Label column sm={labelColWidth}>
                                    Quantity
                                </Form.Label>
                                <Col sm="5">
                                    <Form.Control size="sm" type="number" placeholder="Quantity" />
                                </Col>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
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