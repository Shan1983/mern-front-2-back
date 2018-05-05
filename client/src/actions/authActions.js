import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// register user action
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`api/users/register`, userData)
    .then(response => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// login user action - get user token
export const loginUser = userData => dispatch => {
  axios
    .post(`/api/users/login`, userData)
    .then(response => {
      // save token
      const { token } = response.data;
      // set up local storage and save token
      localStorage.setItem('jwtToken', token);
      // set up the token to the auth header
      setAuthToken(token);
      // decode the token to get the user data
      const decoded = jwt_decode(token);
      // set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// set up the current user
export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
};
