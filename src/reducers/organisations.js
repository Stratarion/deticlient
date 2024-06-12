import { START_LOADING, END_LOADING, CREATE_ORGANISATION, FETCH_ALL_ORGANISATIONS, GET_ORGANISATION_BY_ID } from 'constants/actionTypes';

const organisationsReducer = (state = { isLoading: true, organisations: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_ORGANISATIONS:
      return {
        ...state,
        organisations: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case GET_ORGANISATION_BY_ID:
      return {
        ...state,
        currentOrganisation: action.payload,
      }
    case CREATE_ORGANISATION:
      return { ...state, organisations: [...state.organisations, action.payload] };
    default:
      return state;
  }
};

export default organisationsReducer;
