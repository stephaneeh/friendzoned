const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

// /api/users - GET and POST routes
router.route("/").get(getUsers).post(createUsers);

// /api/users/:userID - GET, PUT and DELETE routes
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

// // /api/users/:userID/friends
// router.route("/:userId/friends/:friendId").get(friends);

// /api/users/:userId/friends/:friendId <POST, DELETE>
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
