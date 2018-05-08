import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types';

// get the current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  // grab the users profile ( from their token ;) )
  axios
    .get(`/api/profile`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      }),
    )
    .catch(err =>
      // if not profile, return an empty object
      // this could be because the user has not yet completed
      // their profile
      dispatch({
        type: GET_PROFILE,
        payload: {},
      }),
    );
};

// create a new profile
export const createNewProfile = (profileData, history) => dispatch => {
  axios
    .post(`/api/profile`, profileData)
    .then(response => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// delete the users account + profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('This is perminate. Are you absolutely sure?')) {
    axios
      .delete(`api/profile`)
      .then(response =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        }),
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      );
  }
};

// add experince
export const addExp = (expData, history) => dispatch => {
  axios
    .post(`api/profile/experience`, expData)
    .then(response => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// add education
export const addEdu = (eduData, history) => dispatch => {
  axios
    .post(`api/profile/education`, eduData)
    .then(response => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// clear the profile on logout
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
