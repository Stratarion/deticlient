import * as api from 'api/index.js';

import { START_LOADING, END_LOADING, CREATE_EVENT, FETCH_EVENTS } from 'constants/actionTypes';

export const createEvent = (body) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createEvent(body);

    dispatch({ type: CREATE_EVENT, payload: data });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const getEventsByOrgId = (org_id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getEventsByOrgId(org_id);
    dispatch({ type: FETCH_EVENTS, payload: data });
    dispatch({ type: END_LOADING });
    return data;
  } catch (error) {
    console.log(error);
  }
};