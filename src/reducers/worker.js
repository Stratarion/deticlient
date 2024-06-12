import { FETCH_ALL } from "constants/actionTypes";

const workersReducer = (state = { isLoading: true, workers: [ ]}, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        workers: action.payload.data,
      };
    default:
      return state;
  }
};

export default workersReducer;