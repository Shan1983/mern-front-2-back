const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile model
const Profile = require('../../models/Profile');
// load user model
const User = require('../../models/User');

//validation
const { validateProfileInput } = require('../../validation/profile');
const { validateExpInput } = require('../../validation/experience');
const { validateEduInput } = require('../../validation/education');

// @route GET api/profile/test
// @desc tests profile route
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works.' });
});

// @route GET api/profile
// @desc get a users profile
// @access private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user.';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  },
);

// @route POST api/profile
// @desc create or edit users profile
// @access private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // check validation
    if (!isValid) {
      // return the errors
      return res.status(400).json(errors);
    }
    // get the fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) {
      profileFields.handle = req.body.handle;
    }
    if (req.body.company) {
      profileFields.company = req.body.company;
    }
    if (req.body.website) {
      profileFields.website = req.body.website;
    }
    if (req.body.location) {
      profileFields.location = req.body.location;
    }
    if (req.body.bio) {
      profileFields.bio = req.body.bio;
    }
    if (req.body.status) {
      profileFields.status = req.body.status;
    }
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    // skills - spit into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // social - empty needs initalizing first
    profileFields.social = {};
    if (req.body.youtube) {
      profileFields.social.youtube = req.body.youtube;
    }
    if (req.body.facebook) {
      profileFields.social.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      profileFields.social.twitter = req.body.twitter;
    }
    if (req.body.instagram) {
      profileFields.social.instagram = req.body.instagram;
    }
    if (req.body.linkedin) {
      profileFields.social.linkedin = req.body.linkedin;
    }

    // look for user
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //update profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true },
          )
            .then(profile => {
              res.json(profile);
            })
            .catch(err => res.status(400).json(err));
        } else {
          // create a new profile
          // does handle exist?

          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists.';
                res.status(400).json(errors);
              }

              // lets save their profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err =>
        res.status(400).json({
          profile: 'No profile for user.',
        }),
      );
  },
);

// @route GET api/profile/handle/:handle
// @desc gets the user by their handle
// @access public
router.get('/handle/:handle', (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for that user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({
        profile: 'No profile for user.',
      }),
    );
});

// @route GET api/profile/user/:user_id
// @desc gets profile by user id
// @access public
router.get('/user/:user_id', (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for that user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({
        profile: 'No profile for user.',
      }),
    );
});

// @route GET api/profile/all
// @desc get all profiles
// @access public
router.get('/all', (req, res) => {
  let errors = {};
  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(500).json({ profile: 'There are no profiles' }));
});

// @route POST api/profile/experience
// @desc add an experiemce to profile
// @access private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        // add to experiemce array
        profile.experience.unshift(newExp);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json({ profile: 'No profile found.' }));
  },
);

// @route POST api/profile/education
// @desc add an education to profile
// @access private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEduInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          field: req.body.field,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description,
        };

        // add to experiemce array
        profile.education.unshift(newEdu);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(500).json({ profile: 'No profile found.' }));
  },
);

// @route DELETE api/profile/experience/:exp_id
// @desc delete a experience
// @access private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // find the index to remove
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // splice the array
        profile.experience.splice(removeIndex, 1);

        // save the profile
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(500).json({ profile: 'Profile was not saved.' }),
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found.' }));
  },
);

// @route DELETE api/profile/education/:edu_id
// @desc delete education
// @access private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // find the index to remove
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // splice the array
        profile.education.splice(removeIndex, 1);

        // save the profile
        profile
          .save()
          .then(profile => {
            res.json(profile);
          })
          .catch(err =>
            res.status(500).json({ profile: 'Profile was not saved.' }),
          );
      })
      .catch(err => res.status(404).json({ profile: 'No profile found.' }));
  },
);

// @route DELETE api/profile
// @desc delete user profile
// @access private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        // delete the user too
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
          .catch(err =>
            res.status(500).json({ error: 'User was not removed.' }),
          );
      })
      .catch(err =>
        res.status(500).json({ error: 'Profile was not removed.' }),
      );
  },
);

module.exports = router;
