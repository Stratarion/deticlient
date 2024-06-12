import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL, CREATE } from 'constants/actionTypes';

export const createSection = (body) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createSection(body);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
}

export const getSectionsList = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchSections(page);

    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const destroySections = () => async (dispatch) => {
  try {
    dispatch({ type: "DESTROY_SECTIONS"});
    const response = await api.destroySections();
    console.log(response);
  }catch (error) {
    console.log(error);
  }
}