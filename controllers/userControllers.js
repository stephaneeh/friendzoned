const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of students overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // TODO: GET all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // TODO: GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              //   grade: await grade(req.params.userId), FIXME: what is this replaced with?
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // TODO: POST a new user:
  createUsers(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // TODO: PUT to update a user by its _id

  //   TODO: DELETE to remove user by its _id
  //   FIXME: BONUS: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "user deleted, but no thoughts found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
