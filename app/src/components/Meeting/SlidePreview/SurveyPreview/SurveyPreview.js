import React from 'react';
import { Carousel, Form } from 'react-bootstrap';

import './SurveyPreview.css'


import QUESTION_TYPE from '../../../../constants/question-type';

const SurveyPreview = ({ survey }) => {
    return (
        <Carousel style={{ width: '100%' }} interval={null} indicators={false}>
            {
                survey.questions.map(question => {
                    return (
                        <Carousel.Item key={question.id}>
                            <Form style={{ textAlign: 'center' }}>
                                <Form.Group>
                                    <Form.Label>{question.text}</Form.Label>
                                    {
                                        question.type === QUESTION_TYPE._FREE_TEXT
                                            ? <div className="col-sm-6 offset-sm-3"><Form.Control as="textarea" rows="3" /></div>
                                            : (
                                                question.type === QUESTION_TYPE._MULTI_SELECT
                                                    ? question.options.map(option => (<Form.Check key={option.value} type="checkbox" label={option.text} name={question.id + '-' + option.value} id={question.id + '-' + option.value} />))
                                                    : question.options.map(option => (<Form.Check key={option.value} type="radio" label={option.text} name={question.id} id={question.id + '-' + option.value} />))
                                            )
                                    }
                                </Form.Group>
                            </Form>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>
    )
}
export default SurveyPreview;
