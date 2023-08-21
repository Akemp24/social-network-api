// require needed packages
const express = require('express');
const { MongoClient } = require('mongodb');
// Require model
const { User, Thought } = require('./models');
const apiRoutes = require('./routes/api');



const app = express();
const port = 3001;

const connectionStringURI = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(connectionStringURI);

let db;

const dbName = 'social-network';
// Middleware configs

// MongoDB connections
client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');

    db = client.db(dbName);

    // api routes
    app.use('/api', apiRoutes);

    // start up express server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });