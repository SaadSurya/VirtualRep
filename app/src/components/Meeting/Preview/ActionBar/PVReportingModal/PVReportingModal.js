import React from 'react';

import './PVReportingModal.css';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Scrollbars from 'react-custom-scrollbars';

const PVReportingModal = ({ show, setShow }) => {
    const labelColWidth = 6;
    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="pvreporting-title" centered
            show={show} onHide={() => setShow(false)}
            dialogClassName="modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title id="pvreporting-title">
                    PV Reporting
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="forms" >
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <Form>

                            <h6>Patient Identification</h6>
                            <br />

                            <Form.Group as={Row}>
                                <Form.Label column sm={labelColWidth}>
                                    Gender
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Check id="gender-m" type="radio" name="gender" label="Male" value="M" />
                                    <Form.Check id="gender-f" type="radio" name="gender" label="Female" value="F" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="yearOfBirth">
                                <Form.Label column sm={labelColWidth}>
                                    Year of Birth
                            </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="yearOfBirth" size="sm" type="text" name="yearOfBirth" data-mask="9999" placeholder="YYYY" className="input-datepicker" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="height">
                                <Form.Label column sm={labelColWidth}>
                                    Height in Centimeters
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="height" size="sm" type="number" name="height" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="weight">
                                <Form.Label column sm={labelColWidth}>
                                    Weight in Kilograms
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Control id="weight" size="sm" type="number" name="weight" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={labelColWidth}>
                                    Type of Report
                            </Form.Label>
                                <Col sm="3">
                                    <Form.Check id="typeOfReport-d" type="radio" name="typeOfReport" label="Resulted in Death" value="D" />
                                    <Form.Check id="typeOfReport-t" type="radio" name="typeOfReport" label="Life Threatening" value="T" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="outcomeDeath">
                                <Form.Label column sm={labelColWidth}>
                                    Check in case of Outcome "Death"
                                </Form.Label>
                                <Col sm="2">
                                    <Form.Check id="outcomeDeath" type="checkbox" name="outcomeDeath" label="" />
                                </Col>
                            </Form.Group>
                            <div className="line"></div>

                            <h6>Description of Adverse Event</h6>
                            <br />

                            <Form.Group controlId="descriptionOfAdverseEvent">
                                <Form.Label>
                                    Description of Adverse Event
                                </Form.Label>
                                <Form.Control id="descriptionOfAdverseEvent" as="textarea" name="descriptionOfAdverseEvent" rows="3" />
                                <span className="text-small text-gray help-block-none">
                                    Please provide all details deemed necessary relating to this AE.
                                </span>
                            </Form.Group>

                            <div className="line"></div>

                            <h6>Adverse Event 1</h6>
                            <br />


                            <Form.Group as={Row}>
                                <Form.Label column sm={labelColWidth}>
                                    Serious
                                </Form.Label>
                                <Col sm="3">
                                    <Form.Check id="serious-d" type="radio" name="serious" label="Resulted in Death" value="D" />
                                    <Form.Check id="serious-t" type="radio" name="serious" label="Life Threatening" value="T" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={labelColWidth}>
                                    Reason for Seriousness
                                </Form.Label>
                                <Col sm="6">
                                    <Form.Check id="reasonOfSeriousness-d" type="radio" name="reasonOfSeriousness" label="Resulted in Death" value="D" />
                                    <Form.Check id="reasonOfSeriousness-t" type="radio" name="reasonOfSeriousness" label="Life Threatening" value="T" />
                                    <Form.Check id="reasonOfSeriousness-h" type="radio" name="reasonOfSeriousness" label="Involved or Prolonged in Patient Hospitalization" value="H" />
                                    <Form.Check id="reasonOfSeriousness-i" type="radio" name="reasonOfSeriousness" label="Involved Persistent or significant disability or incapicity" value="I" />
                                    <Form.Check id="reasonOfSeriousness-c" type="radio" name="reasonOfSeriousness" label="Congenital anomly / Birth Defect" value="C" />
                                    <Form.Check id="reasonOfSeriousness-m" type="radio" name="reasonOfSeriousness" label="Serious Medical Event" value="M" />
                                </Col>
                            </Form.Group>

                            <div className="line"></div>

                            <h6>Signature</h6>

                            <span>By Providing your Email Address below and clicking the OK button you accept to have this report transferred to any and all AE authorized personnel, agency and authority.</span>

                            <br />
                            <br />

                            <Form.Group controlId="emailAddress">
                                <Form.Label>
                                    Email address
                                </Form.Label>
                                <Form.Control id="emailAddress" type="email" name="emailAddress" placeholder="youremail@mail.com" />
                                <span className="text-small text-gray help-block-none">
                                    Please provide the email Address at which you wish to receive confirmation of you AE report (mandatory).
                                </span>
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
        </Modal >
    );
}

export default PVReportingModal;