import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  type,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};

InputGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  icon: propTypes.string,
  onChange: propTypes.func.isRequired,
  type: propTypes.string.isRequired,
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
