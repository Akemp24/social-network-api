// import thought and user model
const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
getAllThoughts(req, res) {
    Thought.find({})
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(thoughtData => res.json(thoughtData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
// get single thought
getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
    .populate({
        path: 'reactions',
        select: '-__v'
    })
    .select('-__v')
    .then(thoughtData => {
        if (!thoughtData) {
            return res.status(404).json({ message: 'Thought not found'}); 
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
// create a new thought
createThought(req, res) {
    Thought.create(req.body)
      .then(thoughtData => {
        // Push thought's _id to associated user's thoughts array
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
// update a thought
updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(thoughtData => {
        if (!thoughtData) {
            return res.status(404).json({ message: 'Thought not found'});
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
},
// delete a thought
deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
    .then(thoughtData => {
        if(!thoughtData) {
            return res.status(404).json({ message: 'Thought not found'});
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
// create a reaction
createReaction(req, res) {
    Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body }},
        { new: true }
    )
    .then(thoughtData => {
        if(!thoughtData) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// delete a reaction
deleteReaction(req, res) {
    Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { new: true }
    )
    .then(thoughtData => {
        if(!thoughtData) {
            return res.status(404).json({ message: 'Thought not found'});
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
};

// export controller
module.exports = thoughtController;















