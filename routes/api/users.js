const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();

// user model
const User = require('../../models/User');

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
  // search for existing email
  // users can only register one email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'email exists' });
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
  const { email, password } = req.body;

  // find by email
  User.findOne({ email })
    .then(user => {
      // check for the user
      if (!user) {
        return res.status(404).json({ email: 'User not found' });
      }

      // check passwords
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // gen token
            res.json({ msg: 'success' });
          } else {
            return res.status(400).json({
              password: 'password incorrect',
            });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
