import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

export const authSetUp = store => {
  // check for token
  if (localStorage.jwtToken) {
    // set the auth token header
    setAuthToken(localStorage.jwtToken);
    // decode the token and get all the user data
    const decoded = jwt_decode(localStorage.jwtToken);
    // set the current user + authenicate them
    store.dispatch(setCurrentUser(decoded)); // store has access to all actions/reducers
    //check for expired tokens
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // log them outs!
      store.dispatch(logoutUser());
      // clear current profile
      store.dispatch(clearProfile());
      //   window.location.href = '/login';
    }
  }
};
