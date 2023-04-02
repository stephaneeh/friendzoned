const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUsers,
  updateUser,
  deleteUser,
  // addFriend,
  // removeFriend,
} = require("../../controllers/userControllers");

// /api/users - GET and POST routes
router.route("/").get(getUsers).post(createUsers);

// /api/users/:userID - GET, PUT and DELETE routes
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//
// -- Directs to: /api/users/:userId/friends/:friendId <POST, DELETE>
// router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
