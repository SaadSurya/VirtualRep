import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';

import './SurveyPreview.css'


import QUESTION_TYPE from '../../../../constants/question-type';

const SurveyPreview = ({ survey, currentSurveyState, onSlideStateChange }) => {

    const [surveyState, setSurveyState] = useState(currentSurveyState);
 
    const carousel = useRef(null);
    
    useEffect(() => {
        setSurveyState(currentSurveyState);
    }, [currentSurveyState]);

    const submit = () => {
        onSlideStateChange(surveyState);
    }

    const handleTextBoxChange = (event, questionId) => {
        surveyState[questionId].answer = event.target.value;
        setSurveyState({ ...surveyState });
    }

    const handleCheckBoxChange = (event, questionId) => {
        if (!surveyState[questionId].answer) {
            surveyState[questionId].answer = []
        }
        const answers = surveyState[questionId].answer;
        if (event.target.checked && answers.indexOf(event.target.value) < 0) {
            surveyState[questionId].answer = [...answers, event.target.value];
        } else if (!event.target.checked && answers.indexOf(event.target.value) > -1) {
            answers.splice(answers.indexOf(event.target.value), 1);
        }
        console.log(surveyState, answers);
        setSurveyState({ ...surveyState });
    }

    const handleRadioButtonChange = (event, questionId) => {
        surveyState[questionId].answer =
            event.target.checked
                ? event.target.value
                : surveyState[questionId].answer;
        setSurveyState({ ...surveyState });
    }

    return (
        <div style={{ width: '100%' }}>
            <Carousel ref={carousel} style={{ width: '100%' }} interval={null} indicators={false} id={survey.id} wrap="false">
                <Carousel.Item>
                    <div style={{ textAlign: 'center', width: '60%', marginLeft: '20%' }}>
                        <h1>{survey.name}</h1>
                        <br />
                        <br />
                        <h6>{survey.description}</h6>
                        <Button onClick={() => carousel.current.next()}>Start</Button>
                    </div>
                </Carousel.Item>
                {
                    survey.questions.map(question => {
                        surveyState[question.id] = surveyState[question.id] || {};
                        return (
                            <Carousel.Item key={question.id}>
                                <Form style={{ textAlign: 'justify', width: '60%', marginLeft: '20%' }}>
                                    <Form.Group>
                                        <Form.Label><h6>{question.text}</h6></Form.Label>
                                        <br />
                                        <br />
                                        {
                                            question.type === QUESTION_TYPE._FREE_TEXT
                                                ? (<div >
                                                    <Form.Control
                                                        value={surveyState[question.id].answer}
                                                        onChange={(event) => handleTextBoxChange(event, question.id)}
                                                        as="textarea"
                                                        rows="3" />
                                                </div>
                                                )
                                                : (
                                                    question.type === QUESTION_TYPE._MULTI_SELECT
                                                        ? question.options.map(option => (
                                                            <Form.Check
                                                                key={option.value}
                                                                type="checkbox"
                                                                checked={(surveyState[question.id].answer || []).indexOf(option.value) > -1}
                                                                onChange={event => handleCheckBoxChange(event, question.id)}
                                                                value={option.value}
                                                                label={option.text}
                                                                name={question.id + '-' + option.value}
                                                                id={question.id + '-' + option.value} />
                                                        ))
                                                        : question.options.map(option => (
                                                            <Form.Check
                                                                key={option.value}
                                                                type="radio"
                                                                checked={surveyState[question.id].answer == option.value}
                                                                onChange={(event) => handleRadioButtonChange(event, question.id)}
                                                                type="radio"
                                                                value={option.value}
                                                                label={option.text}
                                                                name={question.id}
                                                                id={question.id + '-' + option.value} />
                                                        ))
                                                )
                                        }
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="outline-primary" size="sm" onClick={() => carousel.current.prev()}>Previous</Button>
                                        <Button variant="primary" size="sm" onClick={submit}>Submit</Button>
                                        <Button variant="outline-primary" size="sm" onClick={() => carousel.current.next()}>Next</Button>
                                    </Form.Group>
                                </Form>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}
export default SurveyPreview;
