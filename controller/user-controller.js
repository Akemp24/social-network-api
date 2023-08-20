// import the user model
const { User } = require('../models');

const userController = {
//to get all users
getAllUsers(req, res) {
    User.find({})
    .populate({
        path: 'thoughts friends',
        select: '-__v'
    })
    .select('-__v')
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
//to get a single user
getUserById(req, res) {
    User.findById(req.params.userId)
    .populate({
        path: 'thoughts friends',
        select: '-__v'
    })
    .select('-__v')
    .then(userData => {
        if (!userData) {
            return res.status(404).json({ message: 'User not found'}); 
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
// create a new user
createUser(req, res) {
    User.create(req.body)
    .then(userData => res.json(userData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// update a user
updateUser(req, res) {
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(userData => {
        if (!userData) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
},
// delete a user
deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
    .then(userData => {
        if(!userData) {
            return res.status(404).json({ message: 'User not found'});
        }
        // delete thoughts as well
        return Thought.deleteMany({ username: userData.username });
    })
    .then(() => res.json({ message: 'User and associated thoughts successfully deleted'}))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
},
// add a friend to friendlist
addFriend(req, res) {
    User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId }},
        { new: true }
    )
    .then(userData => {
        if(!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
},
// remove a friend from friendlist
removeFriend(req, res) {
    User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendID}},
        { new: true }
    )
    .then(userData => {
        if(!userData) {
            return res.status(404).json({ message: 'User not found'});
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
}
};

module.exports = userController;