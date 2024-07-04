import * as actionType from 'constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('token', JSON.stringify({ token: action?.data.token }));
      return { ...state, authData: action.data.result, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
    case actionType.GETUSERSLIST:
      return {
        ...state,
        userList: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    default:
      return state;
  }
};

export default authReducer;
