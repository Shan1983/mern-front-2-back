const validator = require('validator');
const { isEmpty } = require('./is_empty');

exports.validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // validate email
  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is not valid';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  // validate password
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
