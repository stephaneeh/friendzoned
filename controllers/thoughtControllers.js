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
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // TODO: GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .populate({ path: "reactions", select: "-__v" })
      // .select("-__v")
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
      { _id: req.params.userID },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT to update a thought by its _id
  updateThoughts(req, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-__v" })
      .select("-___v")
      .then((dbThoughthoughtstsData) => {
        if (!thoughts) {
          res
            .status(404)
            .json({ message: "No thoughts with this particular ID!" });
          return;
        }
        res.json(thoughts);
      })
      .catch((err) => res.json(err));
  },
  // DELETE to remove a thought by its _id
  deleteThoughts(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userID },
      { $pull: { thought: { thoughtID: req.params.thoughtID } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   addReaction,
  //   deleteReaction,
};
