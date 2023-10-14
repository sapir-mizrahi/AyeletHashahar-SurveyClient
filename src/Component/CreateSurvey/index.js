import React, { useState } from 'react';
import './style.css';
// import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { connect } from "react-redux";
import { actions } from "../../Redux/actions";

const mapStateToProps = (state) => ({
    // moviesToView: state.moviesReducer.moviesToView,

})
const mapDispatchToProps = (dispatch) => {
    return {
        createSurvey: (value) => dispatch(actions.createSurvey(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function SurveyForm(props) {
    const { createSurvey } = props;
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answerType, setAnswerType] = useState('');
    const [answers, setAnswers] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [ratingMin, setRatingMin] = useState('');
    const [ratingMax, setRatingMax] = useState('');
    const [companyName, setCompanyName] = useState('');
    // const [survey, setSurvey] = useState([]);
    const [surveyQuestions, setSurveyQuestions] = useState([]);
    const [surveyColor, setSurveyColor] = useState('#553077');


    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };
    const saveSurvey = async() => {
        const survey = {
            title,
            subTitle,
            companyName, 
            isAnonymous,
            surveyColor,
            surveyQuestions
        }
        await createSurvey(survey);
    }
    const handleSurveySubmit = () => {
        debugger
        const questionObj = {
            question,
            answerType,
            answers,
            ratingMin,
            ratingMax
        };

        setSurveyQuestions([...surveyQuestions, questionObj]);

        // Reset form fields
        setQuestion('');
        setAnswerType('');
        setAnswers([]);
        setRatingMin('');
        setRatingMax('');
    };

    return (
        <div className='main-div-create-survey'>
            {/* <h2 className='header-survey'>Create a Survey</h2> */}
            <button onClick={() => saveSurvey()}>save</button>
            <div className='row first-part-header'>
                <div className='col-8 left-content-header' style={{ borderBottom: `5px solid ${surveyColor}` }}>
                    <label className='label-title' style={{ color: surveyColor }}>
                        Title:
                        <Form.Control className='title-input' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <label className='label-title' style={{ color: surveyColor }}>
                        Sub Title:
                        <Form.Control className='title-input' type="text" placeholder="Sub Title" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
                    </label>
                    <label className='lable-q'>
                        Company Name:
                        <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder='Company Name' />
                    </label>
                </div>
                <div className='col-2'>
                    <p>Identification required</p>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                </div>
                <div className='col-2'>
                    {/* <p>Survey <br/> color</p> */}

                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue="#553077"
                        title="Choose your color"
                        onChange={(e) => setSurveyColor(e.target.value)}
                    />
                </div>
            </div>

            <div className='main-part'>
                <div className='row main-part-content'>
                    <div className='col-9 new-question'>
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



                    </div>
                    <div className='col-3'>
                        <button className='btn-add-question' onClick={handleSurveySubmit}>Add Question</button>
                    </div>





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
                        <p>Anonymous: {questionObj.isAnonymous ? "Yes" : "No"}</p>
                        {questionObj.answerType === "rating" ? (
                            <p>
                                Rating Range: {questionObj.ratingMin} - {questionObj.ratingMax}
                            </p>
                        ) : null}
                        <p>Company Name: {questionObj.companyName || "Not provided"}</p>
                    </div>
                ))}
            </div>
            <div className='col-3'></div>
        </div>
    );
});