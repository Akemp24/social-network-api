// Define the User Model
// import required packages
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// have code for attaching friends to user?
// friendcount
user.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Export code
const User = mongoose.model('User', user);
module.exports = User;