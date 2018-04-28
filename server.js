const express = require('express');
const mongoose = require('mongoose');

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

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`🦄  Server running on port ${port}`);
});
