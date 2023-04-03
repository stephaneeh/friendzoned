const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of students overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // TODO: GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // TODO: GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // TODO: POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThoughts(req, res) {
    console.log("You are adding a thought");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: _id } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id
  updateThoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE to remove a thought by its _id
  deleteThoughts(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought deleted, but no user found" })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //   addReaction,
  //   deleteReaction,
};
