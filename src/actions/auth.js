import { AUTH, GETUSERSLIST, LOGOUT } from 'constants/actionTypes';
import * as api from 'api/index.js';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log(data)
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersList = (page) => async (dispatch) => {
  try {
    const { data } = await api.getUsersList(page);
    dispatch({ type: GETUSERSLIST, data });
  } catch (error) {
    console.log(error);
  }
}

export const authUser = () => async (dispatch) => {
  try {
    const { data } = await api.authUser();
    dispatch({ type: AUTH, data });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      dispatch({ type: LOGOUT, data: null });
      window.location.href = '/auth';
    }
  }
}
