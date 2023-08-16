// Define the thought model
// import required packages
const mongoose = require('mongoose');

const reaction = new mongoose.Schema(
    {
    reactionId: mongoose.Schema.Types.ObjectId,
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
    }
);

const thought = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reaction]
  });
// have code for other peoples reactions?
// export code
const Thought = mongoose.model('Thought', thought);
module.exports = Thought;