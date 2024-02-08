import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, UPLOAD } from 'constants/actionTypes';

export const uploadImage = (file) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const response = await api.uploadImage(file);
    dispatch({ type: END_LOADING });
    return response.data;
  } catch (error) {
    
  }
}

