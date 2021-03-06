import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TeaxtAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info ? <small className="form-text text-muted">{info}</small> : null}
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

TeaxtAreaFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  info: propTypes.string,
  onChange: propTypes.func.isRequired,
};

export default TeaxtAreaFieldGroup;
