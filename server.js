const express = require('express');
const mongoose = require('mongoose');
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

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`🦄  Server running on port ${port}`);
});
