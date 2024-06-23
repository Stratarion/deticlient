import { FETCH_EVENTS, START_LOADING, END_LOADING } from "constants/actionTypes";

const eventsReducer = (state = { isLoading: true, events: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
};

export default eventsReducer;