import React, { Component } from 'react';
import ProfileAbout from './ProfileAbout';
import ProfileCredits from './ProfileCredits';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';
import Spinner from '../../components/common/spinner';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCredits />
        <ProfileGithub />
      </div>
    );
  }
}

Profile.propTypes = {
  profile: propTypes.object.isRequired,
  getProfileByHandle: propTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
