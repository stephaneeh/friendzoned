const { User, Thought, reactionSchema } = require("../models");

module.exports = {
  // TODO: GET to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate("username")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // TODO: GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate("username")
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
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No User with this id!" });
        }
        res.json({ message: "You have created a thought!" });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  },

  // PUT to update a thought by its _id
  updateThoughts(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .populate("reactions")
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
          ? res.status(404).json({ message: "No thought with this id!" })
          : reactionSchema.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() =>
        res.json({
          message: "Thought with this id and its reactions are deleted",
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  //   addReaction,
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //   deleteReaction,
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
