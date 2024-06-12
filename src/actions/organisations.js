import * as api from 'api/index.js';
import { START_LOADING, END_LOADING, CREATE_ORGANISATION, FETCH_ALL_ORGANISATIONS, DESTROY_ORGANISATION, GET_ORGANISATION_BY_ID } from 'constants/actionTypes';

export const createOrganisation = (body, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createOrganisation(body);

    dispatch({ type: CREATE_ORGANISATION, payload: data });
    dispatch({ type: END_LOADING });
    router('/profile');
  } catch (error) {
    console.log(error);
  }
}

export const getOrganisationsList = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchOrganisations(page);

    dispatch({ type: FETCH_ALL_ORGANISATIONS, payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const destroyOrganisations = () => async (dispatch) => {
  try {
    dispatch({ type: DESTROY_ORGANISATION });
    const response = await api.destroyOrganisations();
    console.log(response);
  }catch (error) {
    console.log(error);
  }
}

export const getOrganisationById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getOrganisationById(id);
    dispatch({ type: GET_ORGANISATION_BY_ID, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
