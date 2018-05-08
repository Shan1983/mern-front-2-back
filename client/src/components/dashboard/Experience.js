import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExp } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick = exp => {
    this.props.deleteExp(exp);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.onDeleteClick(exp.exp)}
            className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExp: propTypes.func.isRequired,
};

export default connect(null, { deleteExp })(Experience);
