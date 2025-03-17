const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const stories = require("../controllers/stories.controller"); 
const Story = require("../models/story.model"); 
const users = require("../controllers/users.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middleware/session.middleware");
const storage = require("../config/storage.config");
const category = require("../models/category.model");
const categories = require("../controllers/categories.controller");

router.get("/stories", stories.list);
router.get("/stories/categories", stories.getCategories); 
router.get("/stories/featured", stories.getFeaturedStories);
router.post("/stories", auth.isAuthenticated, stories.create);
router.get("/stories/:id", stories.detail);
router.delete("/stories/:id", auth.isAuthenticated, stories.delete);
router.patch("/stories/:id", auth.isAuthenticated, stories.update);

router.post("/stories/:id/comments", auth.isAuthenticated, stories.createComment);
router.get("/stories/:id/comments/:commentId", auth.isAuthenticated, stories.detailComment);
router.get("/categories", categories.getCategories);
router.post("/categories", categories.createCategory);

router.post("/users", users.create);
router.patch("/users/me", auth.isAuthenticated, users.update);
router.get("/users", auth.isAuthenticated, users.listAll);
router.get("/users/:id/validate", users.validate);
router.get("/users/me", auth.isAuthenticated, users.profile);

router.get("/users/:userId/written-stories", auth.isAuthenticated, (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  Story.find({ author: userId })
    .then((stories) => res.json(stories))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error fetching stories" });
    });
});


router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

router.get("/:id", async (req, res) => {
  try {
    const user = await user.findById(req.params.id)
      .populate("writtenStories")
      .populate("wishlist");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/follow", async (req, res) => {
  const { followerId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user.following.includes(followerId)) {
      user.following.push(followerId);
      await user.save();
    }
    res.json({ message: "Seguido correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const stories = await Story.find({ featured: true }).limit(5);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const stories = await Story.find({ categories: req.params.category });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
  if (
    error instanceof mongoose.Error.CastError &&
    error.message.includes("_id")
  )
    error = createError(404, "Resource not found");
  else if (error instanceof mongoose.Error.ValidationError)
    error = createError(400, error);
  else if (!error.status) error = createError(500, error.message);

  console.error(error);

  const data = {};
  data.message = error.message;
  if (error.errors) {
    data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
      errors[errorKey] =
        error.errors[errorKey]?.message || error.errors[errorKey];
      return errors;
    }, {});
  }
  res.status(error.status).json(data);
});

module.exports = router;
