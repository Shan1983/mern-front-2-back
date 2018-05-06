import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
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
