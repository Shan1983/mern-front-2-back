import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import { logoutUser } from '../../actions/authActions';
import Spinner from '../common/spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  // beware..
  onDeleteClick = e => {
    this.props.deleteAccount();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if the user has created a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            {/* TODO: exp edu */}
            <div style={{ marginBottom: '60px' }}>
              <button onClick={this.onDeleteClick} className="btn btn-danger">
                Delete My Account
              </button>
            </div>
          </div>
        );
      } else {
        // when they dont have a profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <h1 className="text-muted">:(</h1>
            <p>You haven't set up a profile.</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Quick go create one now!
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth,
  };
};

Dashboard.propTypes = {
  getCurrentProfile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  profile: propTypes.object.isRequired,
  deleteAccount: propTypes.func.isRequired,
  logoutUser: propTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  logoutUser,
})(Dashboard);
