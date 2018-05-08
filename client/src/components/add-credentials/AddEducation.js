import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import propTypes from 'prop-types';
import { addEdu } from '../../actions/profileActions';

class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    field: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false,
  };

  onSubmit = e => {
    e.preventDefault();
    // grab what we want from the component state
    const {
      school,
      degree,
      field,
      from,
      to,
      description,
      current,
    } = this.state;

    // create the object to pass to the action
    const eduData = {
      school,
      degree,
      field,
      from,
      to,
      description,
      current,
    };
    // add the exp.
    this.props.addEdu(eduData, this.props.history);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp etc that you have attended.
              </p>
              <small className="d-block pb-3">* = required fields.</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field Of Study"
                  name="field"
                  value={this.state.field}
                  onChange={this.onChange}
                  error={errors.field}
                />
                <h6>From Date:</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date:</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us about what you studied"
                />
                <input
                  className="btn btn-info btn-block mt-4"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
  addEdu: propTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { addEdu })(withRouter(AddEducation));
