const router = require("express").Router();
const {
  getUsers,
  createUsers,
  getSingleUser,

  deleteUser,
  addAssignment,
  removeAssignment,
} = require("../../controllers/userControllers");

// /api/users
// GET all users
// POST a new user:
router.route("/").get(getUsers).post(createUsers);

// GET a single user by its _id and populated thought and friend data
// DELETE to remove user by its _id
router.route("/:userId").get(getSingleUser).delete(deleteUser);

// PUT to update a user by its _id
router.route("/:userId/thoughts").post(addThoughts);

// BONUS: Remove a user's associated thoughts when deleted.

module.exports = router;
