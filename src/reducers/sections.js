import { FETCH_ALL, CREATE, START_LOADING, END_LOADING } from 'constants/actionTypes';

const sectionsReducer = (state = { isLoading: true, sections: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        sections: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return { ...state, sections: [...state.sections, action.payload] };
    default:
      return state;
  }
};

export default sectionsReducer;
