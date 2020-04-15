import React, { useState, useEffect, useRef } from 'react';
import { Carousel, Form, Button } from 'react-bootstrap';

import './SurveyPreview.css'


import QUESTION_TYPE from '../../../../constants/question-type';

const SurveyPreview = ({ slide, onSubmit }) => {
    const [currentSlide, setCurrentSlide] = useState(slide);
    const carousel = useRef(null);

    const setAnswer = (questionId, answer) => {
        slide.state = slide.state || {};
        slide.state[questionId] = slide.state[questionId] || {};
        slide.state[questionId].answer = answer;
        console.log(slide.state);
    }

    const submit = () => {
        console.log(slide.state);
        onSubmit(slide.state);
    }

    useEffect((currentSlide) => {
        if (currentSlide && currentSlide.state && currentSlide.questions) {
            Object.keys(currentSlide.state).forEach(key => {
                const question = currentSlide.questions.find(quest => quest.id == key);
                if (question) {
                    question.answer = currentSlide.state[key].answer;
                }
            })
            console.log(currentSlide.questions);
        }

    }, [currentSlide]);

    return (
        <div style={{ width: '100%' }}>
            <Carousel ref={carousel} style={{ width: '100%' }} interval={null} indicators={false} id={slide.survey.id} wrap="false">
                <Carousel.Item>
                    <div style={{ textAlign: 'center', width: '60%', marginLeft: '20%' }}>
                        <h1>{slide.survey.name}</h1>
                        <br />
                        <br />
                        <h6>{slide.survey.description}</h6>
                        <Button onClick={() => carousel.current.next()}>Start</Button>
                    </div>
                </Carousel.Item>
                {
                    slide.survey.questions.map(question => {

                        return (
                            <Carousel.Item key={question.id}>
                                <Form style={{ textAlign: 'justify', width: '60%', marginLeft: '20%' }}>
                                    <Form.Group>
                                        <Form.Label><h6>{question.text}</h6></Form.Label>
                                        <br />
                                        <br />
                                        {
                                            question.type === QUESTION_TYPE._FREE_TEXT
                                                ? <div ><Form.Control value={question.answer} onChange={(event) => setAnswer(question.id, event.target.value)} as="textarea" rows="3" /></div>
                                                : (
                                                    question.type === QUESTION_TYPE._MULTI_SELECT
                                                        ? question.options.map(option => (<Form.Check key={option.value} type="checkbox" value={option.value} label={option.text} name={question.id + '-' + option.value} id={question.id + '-' + option.value} />))
                                                        : question.options.map(option => (<Form.Check key={option.value} onChange={(event) => setAnswer(question.id, event.target.value)} type="radio" value={option.value} label={option.text} name={question.id} id={question.id + '-' + option.value} />))
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
