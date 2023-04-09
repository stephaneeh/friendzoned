const { Schema, Types, model } = require("mongoose");

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

const reactionSchema = new Schema({
  reactionID: {
    type: Types.ObjectId,
    default: new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    Required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: (date) => formatDate(date),
  },
});

// Schema to create Though model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => formatDate(date),
    },
    username: {
      type: String,
      Required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
