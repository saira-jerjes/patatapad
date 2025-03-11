const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const stories = require("../controllers/stories.controller"); 
const users = require("../controllers/users.controller");
const sessions = require("../controllers/sessions.controller");
const auth = require("../middleware/session.middleware");
const storage = require("../config/storage.config");

router.get("/stories", auth.isAuthenticated, stories.list);
router.get("/stories/categories", stories.getCategories); 
router.get("/stories/featured", stories.getFeaturedStories);
router.post("/stories", auth.isAuthenticated, stories.create);
router.get("/stories/:id", stories.detail);
router.delete("/stories/:id", auth.isAuthenticated, stories.delete);
router.patch("/stories/:id", auth.isAuthenticated, stories.update);

router.post("/stories/:id/comments", auth.isAuthenticated, stories.createComment);
router.get("/stories/:id/comments/:commentId", auth.isAuthenticated, stories.detailComment);

router.post("/users", users.create);
router.patch("/users/me", auth.isAuthenticated, users.update);
router.get("/users", auth.isAuthenticated, users.listAll);
router.get("/users/:id/validate", users.validate);
router.get("/users/me", users.validate, users.profile);

router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

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
