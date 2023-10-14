import React, { useEffect } from 'react';
import './style.css'
import { connect } from "react-redux";
import { actions } from "../../Redux/actions";
import Form from 'react-bootstrap/Form';

const mapStateToProps = (state) => ({
    allSurveys: state.surveyReducer.allSurveys,

})
const mapDispatchToProps = (dispatch) => {
    return {
        getAllSurveys: () => dispatch(actions.getAllSurveys())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(function ViewSurvey(props) {
    const { getAllSurveys, allSurveys } = props;
    useEffect(() => {
        getSurveys();
    }, [])
    const getSurveys = async () => {
        await getAllSurveys();
    }
    console.log(allSurveys[4]?.questions);
    return (
        <div className="view-survey-main">
            <div className="view-survey-header">
                <div className="survey-title" style={{ color: allSurveys[4]?.surveyColor }}>{allSurveys[4]?.title}</div>
                <div className="survey-sub-title">{allSurveys[4]?.subTitle}</div>
                <div className="survey-company-name">{allSurveys[4]?.companyName}</div>
            </div>
            <div className="view-survey-questions" style={{ borderColor: allSurveys[4]?.surveyColor }}>
                {allSurveys[4]?.questions?.map((item, index) => {
                    switch (item?.type) {
                        case 'regular':
                            return <div className="q-div">
                                <div className="question-title">{item?.question}</div>
                                <input type="text" />
                            </div>
                        case 'multi':
                            return <div className="q-div">
                                <div className="question-title">{item?.question}</div>
                                <div className="multi-que">
                                    {item?.answers?.map((x) =>
                                        <div className="multi-item"><Form.Check type='checkbox' /> <label>{x}</label></div>)}
                                </div>
                            </div>
                        case 'single':
                            return <div className="q-div">
                                <div className="question-title">{item?.question}</div>
                                <div className="multi-que">
                                    {item?.answers?.map((x) =>
                                        <div className="multi-item">  <Form.Check type='radio' /><label>{x}</label></div>)}
                                </div>
                            </div>
                        case 'rating':
                            return <div className="q-div">
                                <div className="question-title">{item?.question}</div>
                                <input type='range' min={item?.min} max={item.max} />
                            </div>
                        default:
                            return <div className="q-div">
                                <div>{item.question}</div>
                                <input />
                            </div>
                    }
                }

                )}
            </div>
        </div>
    );
})
