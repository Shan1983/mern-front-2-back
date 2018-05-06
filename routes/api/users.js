const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();

// user model
const User = require('../../models/User');

// config
const keys = require('../../config/keys');

// validation
const { validateRegisterInput } = require('../../validation/register');
const { validateLoginInput } = require('../../validation/login');

// @route GET api/users/test
// @desc tests users route
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'users works.' });
});

// @route GET api/users/register
// @desc register a new user
// @access public
router.post('/register', (req, res) => {
  // validate input
  const { errors, isValid } = validateRegisterInput(req.body);
  // check if its valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // search for existing email
  // users can only register one email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists.';
        return res.status(400).json({ errors });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm', //default image
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/users/login
// @desc login a user. Returns a jwt token
// @access public
router.post('/login', (req, res) => {
  // validate input
  const { errors, isValid } = validateLoginInput(req.body);
  // check if its valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // find by email
  User.findOne({ email })
    .then(user => {
      // check for the user
      if (!user) {
        errors.email = 'User not found.';
        return res.status(404).json(errors);
      }

      // check passwords
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // create the user payload for the jwt
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            };
            // generate jwt
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 }, // 3600 1 hour
              (err, token) => {
                res.json({ success: true, token: `Bearer ${token}` });
              },
            );
          } else {
            errors.password = 'Incorrect password.';
            return res.status(400).json(errors);
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @route GET api/users/current
// @desc returns current user
// @access private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  },
);

module.exports = router;
