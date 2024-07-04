import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL_WORKERS } from 'constants/actionTypes';

export const addWorker = (body) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.addWorker(body);
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
}
export const getWorkersByOrgId = (org_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getWorkersByOrgId(org_id);
    dispatch({ type: FETCH_ALL_WORKERS, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}
