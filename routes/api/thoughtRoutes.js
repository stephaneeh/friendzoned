// Require express router
const router = require("express").Router();

// Set requirements (from thoughts-controller)
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

// /api/thoughts  - GET routes
router.route("/").get(getThoughts).post(createThoughts);

// /api/thoughts/:id - GET, PUT and DELETE routes
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:userId  - POST routes
router.route("/:userId").post(createThoughts);

// /api/thoughts/:thoughtId/reactions  - POST routes
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactionId  - DELETE routes
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);
// FIXME: NOT WORKING

// Export module router
module.exports = router;
