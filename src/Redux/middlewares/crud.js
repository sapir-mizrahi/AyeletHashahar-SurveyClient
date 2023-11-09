import { actions } from "../actions";

const url = "http://localhost:8000";

export const signIn = () => next => action => {

  if (action.type === 'SIGN_IN') {
    let user = action.payload;
    return fetch(`${url}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        return data;
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return next(action)
}


export const signUp = () => next => action => {

  if (action.type === 'SIGN_UP') {
    let user = action.payload;
    return fetch(`${url}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        return data;
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return next(action)
}

export const createSurvey = () => next => action => {
  let survey = action.payload;
  if (action.type === 'CREATE_SURVEY') {
    return fetch(`${url}/survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(survey)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        return data;
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return next(action)
}

export const createSurveyAnswers = () => next => action => {
  let surveyAnswers = action.payload;
  if (action.type === 'CREATE_SURVEY_ANSWERS') {
    return fetch(`${url}/statistic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(surveyAnswers)
    })
      .then((response) => response.json())
      .then((data) => {

        console.log("success", data);
        return data;
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return next(action)
}

export const getSurveysByUserCreated =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        if (action.type === "GET_SURVEYS_BY_USER_CREATED") {
          return fetch(`${url}/statistic/${action.payload}`)
            .then((response) => response.json())
            .then((data) => {

              return data?.data
            });
        }
        return next(action);
      };

export const getAllSurveys =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        if (action.type === "GET_ALL_SURVEYS") {
          return fetch(`${url}/survey`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              dispatch(actions.setAllSurveys(data.data));
              return data?.data
            });
        }
        return next(action);
      };
