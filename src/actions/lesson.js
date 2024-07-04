import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL_LESSONS } from 'constants/actionTypes';

export const addLesson = (body) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.addLesson(body);
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
}
export const getLessonsByOrgId = (org_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getLessonsByOrgId(org_id);
    dispatch({ type: FETCH_ALL_LESSONS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}
