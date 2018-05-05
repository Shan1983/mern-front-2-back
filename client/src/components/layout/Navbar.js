import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propsTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  // authentication links
  authLinks = user => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a href="" onClick={this.onLogoutClick} className="nav-link">
          <img
            src={user.avatar}
            className="rounded-circle"
            alt={user.name}
            title="You must have a gravatar connected to your email to display and image"
            style={{ width: '25px', marginRight: '5px' }}
          />
          Logout
        </a>
      </li>
    </ul>
  );
  guestLinks = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevConnector
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    Developers
                  </Link>
                </li>
              </ul>

              {isAuthenticated ? this.authLinks(user) : this.guestLinks()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

Navbar.propsTypes = {
  logoutUser: propsTypes.func.isRequired,
  auth: propsTypes.object.isRequired,
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
