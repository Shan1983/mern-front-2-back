const validator = require('validator');
const { isEmpty } = require('./is_empty');

exports.validateEduInput = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.field = !isEmpty(data.field) ? data.field : '';

  // validate

  if (validator.isEmpty(data.school)) {
    errors.school = 'School is required.';
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required.';
  }

  if (validator.isEmpty(data.from)) {
    errors.from = 'From field is required.';
  }

  if (validator.isEmpty(data.field)) {
    errors.field = 'Study field is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
