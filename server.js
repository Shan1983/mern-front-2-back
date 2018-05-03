const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// db config
const db = require('./config/keys').mongoURL;

// connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log('😎  MongoDb is connected!');
  })
  .catch(err => {
    console.log(`☠️  MongoDB failed to connect! \n${err}`);
  });

// middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport.js')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/post', posts);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🦄  Server running on port ${port}`);
});
