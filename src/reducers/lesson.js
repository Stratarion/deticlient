import { FETCH_ALL_LESSONS, END_LOADING, START_LOADING } from "constants/actionTypes";

const workersReducer = (state = { isLoading: true, lessons: [ ]}, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_LESSONS:
      return {
        ...state,
        lessons: action.payload.data,
      };
    default:
      return state;
  }
};

export default workersReducer;