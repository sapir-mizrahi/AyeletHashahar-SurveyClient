import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createSurvey, getAllSurveys, signIn, signUp, createSurveyAnswers, getSurveysByUserCreated } from './middlewares/crud';
import surveyReducer from './reducers/surveys';

const reducer = combineReducers({ surveyReducer });

const store = createStore(reducer, applyMiddleware( createSurvey, getAllSurveys, signIn, signUp, 
    createSurveyAnswers, getSurveysByUserCreated));
window.store = store

export default store;