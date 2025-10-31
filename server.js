require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const basicAuth = require('./middleware/basicAuth');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user_management';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Protect all /api routes with Basic Auth
app.use('/api', basicAuth);

app.use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('User Management API is running.'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
