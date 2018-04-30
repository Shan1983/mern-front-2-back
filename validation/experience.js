const validator = require('validator');
const { isEmpty } = require('./is_empty');

exports.validateExpInput = data => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  // validate

  if (validator.isEmpty(data.title)) {
    errors.title = 'Job title is required.';
  }

  if (validator.isEmpty(data.company)) {
    errors.company = 'Company field is required.';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
