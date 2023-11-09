import React, { useState } from 'react';
import './style.css';
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions";
import { MdOutlinePermIdentity } from 'react-icons/md';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MdGroupAdd } from 'react-icons/md';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import logoSurvey from '../../image/logoSurvey.jpg';

const mapDispatchToProps = (dispatch) => {
    return {
        createSurvey: (value) => dispatch(actions.createSurvey(value))
    }
}
export default connect(null, mapDispatchToProps)(function SurveyForm(props) {
    const { createSurvey } = props;
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answerType, setAnswerType] = useState('');
    const [answers, setAnswers] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [ratingMin, setRatingMin] = useState('');
    const [ratingMax, setRatingMax] = useState('');
    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [show, setShow] = useState(false);
    const [arrContactGroup, setArrContactGroup] = useState([]);
    const [contentInput, setInputContent] = useState('');
    const [success, setSuccess] = useState(false);
    let index = 0;
    const handleClose = () => setShow(false);

    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const saveSurvey = async () => {
        const survey = {
            title,
            subTitle,
            userId: JSON.parse(localStorage.getItem('userDetails'))?._id,
            surveyType: isAnonymous,
            questions: surveyQuestions,
            surveyGroup: arrContactGroup
        }

        let res = await createSurvey(survey);
        if (res?.message === "Create New Survey") {
            setSuccess(true)
        }
    }

    const handleSurveySubmit = () => {
        const questionObj = {
            question,
            answerType,
            answers,
            ratingMin,
            ratingMax,
            ans: answerType === "multi" ? [] : ''
        };
        index++;
        
        setSurveyQuestions([...surveyQuestions, questionObj]);

        // Reset form fields
        setQuestion('');
        setAnswerType('');
        setAnswers([]);
        setRatingMin('');
        setRatingMax('');
    };

    const addMore = () => {
        setInputContent('')
        setArrContactGroup([...arrContactGroup, contentInput])
    }

    return (
        <div className='main-div-create-survey'>
            {success ? <div className='main-message'> <div className='message-title'>The survey was successfully saved!</div>
                <img src={logoSurvey} className='logo-img' />
                <button className='btn-new-survey' onClick={() => setSuccess(false)}>New</button>
            </div> :
                <>
                    <div className='setting-div'>
                        <div className='div-add-p'>
                            <MdGroupAdd className='icon-add-pepole' />
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={isAnonymous}
                                onChange={(e) => (setShow(!show), setIsAnonymous(e.target.checked))}
                            />
                        </div>

                        <button className='btn-save-survey' onClick={() => saveSurvey()}>Save</button>

                        <Offcanvas show={show} onHide={handleClose} placement='end' >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title className='title-add-contact'>Add Contact To Survey <MdGroupAdd /></Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {arrContactGroup?.map((item) =>
                                    <div>{item}</div>
                                )}
                                <input style={{ borderColor: 'gray', borderRadius: '5px', marginTop: '20px' }} value={contentInput} onChange={(e) => setInputContent(e.target.value)} />
                                <AiOutlinePlusSquare className="btn-add" onClick={() => addMore()} />
                                <div>
                                    <Button onClick={handleClose} className='btn-save-contacts'>Save</Button>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                    <div className="create-survey-header">
                        <label className='label-title' >
                            Title:
                            <Form.Control className='title-input' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label className='label-title' >
                            Sub Title:
                            <Form.Control className='title-input' type="text" placeholder="Sub Title" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
                        </label>
                    </div>
                    <div className='main-part'>
                        <label className='lable-q'>
                            The Question:
                            <Form.Control value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Question" />
                        </label>

                        <label className='lable-q'>
                            Answer Type:
                            <Form.Select value={answerType} onChange={(e) => setAnswerType(e.target.value)}>
                                <option value="">Select Answer Type</option>
                                <option value="normal">Normal Input</option>
                                <option value="multi">Multiple Choice</option>
                                <option value="single">Single Choice</option>
                                <option value="rating">Rating (Scale)</option>
                            </Form.Select>
                        </label>

                        {answerType === "multi" || answerType === "single" ? (

                            <ul>
                                Answers:
                                {answers.map((answer, index) => (
                                    <li className='li-ans' key={index}>
                                        <Form.Control type="text" value={answer} onChange={(e) => handleAnswerChange(index, e.target.value)} placeholder={'Answer ' + (index + 1)} />
                                    </li>
                                ))}
                                <button className='btn-add-ans' onClick={handleAddAnswer}>Add Answer</button>
                            </ul>
                        ) : null}

                        {answerType === "rating" ? (
                            <div>
                                <label className='label-rating'>
                                    Rating Minimum:
                                    <Form.Control type="number" value={ratingMin} onChange={(e) => setRatingMin(e.target.value)} />
                                </label>

                                <label className='label-rating' >
                                    Rating Maximum:
                                    <Form.Control type="number" value={ratingMax} onChange={(e) => setRatingMax(e.target.value)} />
                                </label>
                            </div>
                        ) : null}



                        {/* </div> */}
                        <div className='col-3'>
                            <button className='btn-add-question' onClick={handleSurveySubmit}>Add Question</button>
                        </div>

                        <h3>Survey Questions:</h3>
                        {surveyQuestions.map((questionObj, index) => (
                            <div key={index}>
                                <h4>{questionObj.title}</h4>
                                <p>{questionObj.question}</p>
                                <p>Answer Type: {questionObj.answerType}</p>
                                <ul>
                                    {questionObj.answers.map((answer, i) => (
                                        <li key={i}>{answer}</li>
                                    ))}
                                </ul>
                                {questionObj.answerType === "rating" ? (
                                    <p>
                                        Rating Range: {questionObj.ratingMin} - {questionObj.ratingMax}
                                    </p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    <div className='col-3'></div>
                </>}
        </div>
    );
});