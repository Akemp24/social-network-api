const router = require('express').Router();

// Import user and thought controller functions
const userController = require('../controllers/user-controller');
const thoughtController = require('../controllers/thought-controller');

// Define user routes
router.route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/users/:userId')
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/users/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

// Define thought routes
router.route('/thoughts')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router.route('/thoughts/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/thoughts/:thoughtId/reactions')
  .post(thoughtController.createReaction)
  .delete(thoughtController.deleteReaction);

module.exports = router;