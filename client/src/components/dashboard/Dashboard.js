import React, { Component } from 'react';
import propTypyes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return (
      <div>
        <h1>HOWDY</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
