import produce from "immer";
import createReducer from "./reducerUtils";

const initalStaste = {
  allSurveys: {},
  
};

const survey = {
  setAllSurveys(state, action) {
    state.allSurveys = action.payload;
  },

  setMoviesToView(state, action) {
    debugger
    state.moviesToView = action.payload;
  },
  setModalShow(state, action) {
    state.modalShow = action.payload;
  },
};

export default produce(
  (state, action) => createReducer(state, action, survey),
  initalStaste
);
