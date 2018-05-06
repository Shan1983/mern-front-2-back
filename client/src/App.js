import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import store from './store';

// check for token
if (localStorage.jwtToken) {
  // set the auth token header
  setAuthToken(localStorage.jwtToken);
  // decode the token and get all the user data
  const decoded = jwt_decode(localStorage.jwtToken);
  // set the current user + authenicate them
  store.dispatch(setCurrentUser(decoded)); // store has access to all actions/reducers
  //check for expired tokens
  const currentTime = new Date();
  if (decoded.exp < currentTime.getTime()) {
    console.log('times up');
    store.dispatch(logoutUser());
    // send them packing to the login screen
    window.location.href = '/login';
    // clear current profile
    // TODO
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
