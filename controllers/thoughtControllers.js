const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

// Aggregate function to get the number of students overall
const headCount = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  // TODO: GET all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          headCount: await headCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // TODO: GET to get a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtID })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThoughts() {
    Thought.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a thought by its _id
  updateThoughts() {},
  // DELETE to remove a thought by its _id
  deleteThoughts() {},
  //   addReaction,
  //   deleteReaction,
};
