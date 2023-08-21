const mongoose = require('mongoose');

// Local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social-network');

// MongoDB connection with options
const connectionString = 'mongodb://127.0.0.1:27017/social-network';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

// Export connection 
module.exports = mongoose.connection;
