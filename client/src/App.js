import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import jwt_decode from 'jwt-decode';
// import setAuthToken from './utils/setAuthToken';
// import { setCurrentUser, logoutUser } from './actions/authActions';
// import { clearProfile } from './actions/profileActions';
import './App.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';

import PrivateRoute from './components/common/PrivateRoute';

import store from './store';

import { authSetUp } from './components/common/authSetup';

// set up tokens to localstorage and check if token is expired
authSetUp(store);

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
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
