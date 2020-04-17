import React from 'react';

import './MedicalSurveyModal.css';
import { Modal, Button, Form } from 'react-bootstrap';

const MedicalSurveyModal = ({ show, setShow }) => {

    const submit = () => {
        setShow(false);
    };

    return (
        <Modal size="lg" aria-labelledby="medical-survey-title" centered
            show={show} onHide={() => setShow(false)}
            dialogClassName="modal-dialog-scrollable">
            <Modal.Header closeButton>
                <Modal.Title id="medical-survey-title">
                    Medical Survey
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="forms">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10">
                        <Form>

                            <h6>Diabetic Survey of Distant Engagement</h6>
                            <span className="text-small text-gray help-block-none">We would like to have your opinion in relation to management of diabetic patients.</span>
                            <br />
                            <br />
                            <Form.Group >
                                <Form.Label>
                                    <h6>How many diabetic patients do you see in a month?</h6>
                                </Form.Label>
                                <Form.Check id="1" type="checkbox" label="< 10" />
                                <Form.Check id="2" type="checkbox" label="10 - 20" />
                                <Form.Check id="3" type="checkbox" label="21 - 30" />
                                <Form.Check id="4" type="checkbox" label="> 30" />
                            </Form.Group>
                            <div className="line"></div>

                            <Form.Group >
                                <Form.Label>
                                    <h6>Which group of oral anti-diabetics do you prefer to treat your newly diagnosed diabetic patients?</h6>
                                </Form.Label>
                                <Form.Check id="Sulfonylureas" type="checkbox" label="Sulfonylureas (Gliclazide, Glibenclamide, Glimepiride)" />
                                <Form.Check id="Biguanides" type="checkbox" label="Biguanides (Metformin)" />
                                <Form.Check id="DPP4" type="checkbox" label="DPP4 Inhibitors (Sitagliptin, Linagliptin)" />
                                <Form.Check id="SGLT2" type="checkbox" label="SGLT2 Inhibitors (Dapagliflozin, Empagliflozin)" />
                                <Form.Check id="Thiazolidinediones" type="checkbox" label="Thiazolidinediones (Pioglitazone)" />
                                <Form.Check id="Meglitinides" type="checkbox" label="Meglitinides (Repaglinide)" />
                                <Form.Check id="Alpha" type="checkbox" label="Alpha-glucosidase Inhibitors (Acarbose)" />
                            </Form.Group>
                            <div className="line"></div>

                            <Form.Group >
                                <Form.Label>
                                    <h6>What is the main reason for your preference?</h6>
                                </Form.Label>
                                <Form.Check id="Efficacy" type="checkbox" label="Efficacy" />
                                <Form.Check id="Safety" type="checkbox" label="Safety" />
                                <Form.Check id="Dosage" type="checkbox" label="Dosage convenience" />
                                <Form.Check id="Patient" type="checkbox" label="Patient affordability" />
                                <Form.Check id="HbA1c" type="checkbox" label="HbA1c control" />
                                <Form.Check id="No" type="checkbox" label="No/minimum microvascular/macrovascular complications with long-term use" />
                            </Form.Group>
                            <div className="line"></div>

                            <Form.Group >
                                <Form.Label>
                                    <h6>Which group of oral anti-diabetics in your opinion is most beneficial for reducing progression of renal failure?</h6>
                                </Form.Label>
                                <Form.Control as="textarea" rows="3" />
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

export default MedicalSurveyModal;