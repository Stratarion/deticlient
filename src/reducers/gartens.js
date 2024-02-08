import { FETCH_ALL, CREATE, START_LOADING, END_LOADING } from 'constants/actionTypes';

const gartenReducer = (state = { isLoading: true, gartens: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        gartens: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, gartens: [...state.gartens, action.payload] };
    default:
      return state;
  }
};

export default gartenReducer;
