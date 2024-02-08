import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL, CREATE } from 'constants/actionTypes';

export const createGarten = (body) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createGarten(body);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
}

export const getGartenList = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchGartens(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const destroyGartens = () => async (dispatch) => {
  try {
    dispatch({ type: "DESTROY_GARTENS"});
    const response = await api.destroyGartens();
    console.log(response);
  }catch (error) {
    console.log(error);
  }
}