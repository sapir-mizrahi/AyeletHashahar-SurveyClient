import React, { useEffect, useState } from 'react';
import './style.css'
import { connect } from "react-redux";
import { actions } from "../../Redux/actions";
import Form from 'react-bootstrap/Form';
import { FiSave } from 'react-icons/fi';
import { FcSurvey } from 'react-icons/fc';
import Slider from '@mui/material/Slider';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import logoSurvey from '../../image/logoSurvey.jpg';

const mapStateToProps = (state) => ({
    allSurveys: state.surveyReducer.allSurveys,

})
const mapDispatchToProps = (dispatch) => {
    return {
        getAllSurveys: () => dispatch(actions.getAllSurveys()),
        createSurveyAnswers: (data) => dispatch(actions.createSurveyAnswers(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function ViewSurvey(props) {
    const { getAllSurveys, createSurveyAnswers } = props;
    const [personalSurveys, setPersonalSurveys] = useState([]);
    const [publicSurveys, setPublicSurveys] = useState([]);
    const [surveyToShow, setSurveyToShow] = useState();
    const [surveyToShowAnswers, setSurveyToShowAnswers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        getSurveys();
    }, [])

    const getSurveys = async () => {
        let a = []
        let b = []
        await getAllSurveys().then((res) => {
            res && res?.map((item) => {
                if (item?.surveyType) {
                    if (JSON.parse(localStorage.getItem('userDetails')) && item?.surveyGroup?.includes(JSON.parse(localStorage.getItem('userDetails'))?.email)) {
                        a.push(item)
                    }
                }
                else {
                    b.push(item)
                }
            })
            setPersonalSurveys(a);
            setPublicSurveys(b);
            console.log(publicSurveys);
        });

    }
    function valuetext(value) {
        return `${value}`;
    }

    const handleSaveSurvey = async () => {

        let surveyAnswers = {
            surveyId: surveyToShow?._id,
            title: surveyToShow?.title,
            subTitle: surveyToShow?.subTitle,
            userId: surveyToShow?.userId,
            answers: surveyToShowAnswers
        }
        await createSurveyAnswers(surveyAnswers).then((res) => {
            if (res?.status === 200) {
                setShow(true)
                setSurveyToShow()
            }

        })

    }

    const setAnswer = (index, value) => {
        let newObj;
        const a = surveyToShowAnswers?.[index]
        let multiArr = a?.ans;
        if (a?.answerType === "multi") {
            multiArr = Object.assign([], multiArr);
            multiArr.push(value);
            newObj = {
                ans: multiArr,
                answerType: a?.answerType,
                answers: a?.answers,
                question: a?.question,
                ratingMax: a?.ratingMax,
                ratingMin: a?.ratingMin
            }
        }
        else {
            newObj = {
                ans: value,
                answerType: a?.answerType,
                answers: a?.answers,
                question: a?.question,
                ratingMax: a?.ratingMax,
                ratingMin: a?.ratingMin
            }
        }
        let b = surveyToShowAnswers
        let c = [];
        for (let i = 0; i < b.length; i++) {
            if (i === index)
                c.push(newObj)
            else
                c.push(b[i])
        }
        setSurveyToShowAnswers(c)
    }

    return (
        <div className="view-survey-main row">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your feedback has been saved !</Modal.Title>
                </Modal.Header>
                <Modal.Body className='thank'>Thank you for the answer, for taking the time.
                    <img src={logoSurvey} className='logo-img1' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='col-4'>
                {publicSurveys?.length > 0 && <> <div className='personal'>Public Surveys</div>
                    <div className='all-public-surveys'>
                        {publicSurveys?.map((item) =>
                            <div className='survey-name-item' onClick={() => (setSurveyToShow(item), setSurveyToShowAnswers(item?.questions))}>{item?.title}</div>
                        )}
                    </div></>}
                {personalSurveys.length > 0 && JSON.parse(localStorage.getItem('userDetails')) && <> <div className='personal'>Personal Surveys</div>
                    <div className='all-public-surveys'>
                        {personalSurveys?.map((item) =>
                            <div className='survey-name-item' onClick={() => (setSurveyToShow(item), setSurveyToShowAnswers(item?.questions))}>{item?.title}</div>
                        )}
                    </div></>}
            </div>
            <div className='col-8'>
                {!surveyToShow ? <div className='no-selected-div'><FcSurvey className='icon-no' />
                    <div className='no-selected-content'>No survey selected yet, click to answer...</div></div>
                    : <>
                        <div className='div-head'>
                            <button
                                className='btn-save'
                                onClick={() => handleSaveSurvey()}
                            >Save <FiSave /></button>
                        </div>
                        <div className="view-survey-header">
                            <div className="survey-title" >{surveyToShow.title}</div>
                            <div className="survey-sub-title">{surveyToShow?.subTitle}</div>
                        </div>

                        <div className="view-survey-questions" >
                            {surveyToShow?.questions?.map((item, index) => {
                                switch (item?.answerType) {
                                    case 'normal':
                                        return <div className="q-div">
                                            <div className="question-title">{item?.question}</div>
                                            <input onChange={(e) => setAnswer(index, e.target.value)} type="text" className='normal-input' />
                                        </div>
                                    case 'multi':
                                        return <div className="q-div">
                                            <div className="question-title">{item?.question}</div>
                                            <div className="multi-que">
                                                {item?.answers?.map((x, i) =>
                                                    <Form.Check
                                                        onChange={() => setAnswer(index, x)}
                                                        name={item?.name}
                                                        key={i}
                                                        label={x}
                                                        type='checkbox' />)}
                                            </div>
                                        </div>
                                    case 'single':
                                        return <div className="q-div">
                                            <div className="question-title">{item?.question}</div>
                                            <div className="multi-que">
                                                {item?.answers?.map((x, i) =>
                                                    <Form.Check
                                                        label={x}
                                                        type='radio'
                                                        id={`ans-${i}`}
                                                        className='radio-check'
                                                        name="group1"
                                                        onChange={() => setAnswer(index, x)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    case 'rating':
                                        return <div className="q-div">
                                            <div className="question-title">{item?.question}</div>
                                            <Slider
                                                aria-label="Temperature"
                                                getAriaValueText={valuetext}
                                                valueLabelDisplay="auto"
                                                min={parseInt(item.ratingMin)}
                                                max={parseInt(item.ratingMax)}
                                                marks
                                                onChange={(e) => setAnswer(index, e.target.value)}
                                            />

                                            <div className='rating-values'>
                                                <div>{item?.ratingMin}</div>
                                                <div>{item?.ratingMax}</div>
                                            </div>
                                        </div>
                                    default:
                                        return <div className="q-div">
                                            <div>{item.question}</div>
                                            <input
                                                onChange={(e) => setAnswer(index, e.target.value)}
                                            />
                                        </div>
                                }
                            }

                            )}
                        </div>
                    </>}
            </div>
        </div>
    );
})
