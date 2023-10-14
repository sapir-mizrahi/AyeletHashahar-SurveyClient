import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createSurvey, getAllSurveys } from './middlewares/crud';
import surveyReducer from './reducers/surveys';

const reducer = combineReducers({ surveyReducer });

const store = createStore(reducer, applyMiddleware( createSurvey, getAllSurveys));
window.store = store

export default store;