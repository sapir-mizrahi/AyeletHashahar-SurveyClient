import { actions } from "../actions";

const url = "http://localhost:8000";

export const createSurvey = () => next => action => {
  let survey = action.payload;
  if (action.type === 'CREATE_SURVEY') {
    let user = action.payload;
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
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return next(action)
}

// export const createSurvey =
//   ({ dispatch }) =>
//     (next) =>
//       (action) => {
//         if (action.type === "CREATE_SURVEY") {
//           return fetch(`${url}/survey`)
//             .then((response) => response.json())
//             .then((data) => {
//               dispatch(actions.setMoviesToView(data.data));
//             });
//         }
//         return next(action);
//       };

export const getAllSurveys =
  ({ dispatch }) =>
    (next) =>
      (action) => {
        if (action.type === "GET_ALL_SURVEYS") {
          return fetch(`${url}/survey`)
            .then((response) => response.json())
            .then((data) => {
              dispatch(actions.setAllSurveys(data.data));
            });
        }
        return next(action);
      };
