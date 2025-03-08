const createError = require("http-errors");
const Story = require("../models/story.model");
const Comment = require("../models/comment.model");

module.exports.create = (req, res, next) => {
  const story = { ...req.body, author: req.user.id };
  story.featured = req.body.featured || false;

  Story.create(story)
    .then((story) => res.status(201).json(story))
    .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;

  Story.findById(id)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: { path: "user", select: "username" },
    })
    .then((story) => {
      if (!story)
        next(createError(404, "This story is just in your imagination"));
      else res.json(story);
    })
    .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const permittedParams = ["title", "extract", "content", "categories"];

  Object.keys(body).forEach((key) => {
    if (!permittedParams.includes(key)) delete body[key];
  });

  Story.findByIdAndUpdate(id, body, { runValidators: true, new: true })
    .then((story) => {
      if (!story) return next(createError(404, "Story not created"));
      res.status(201).json(story);
    })
    .catch((error) => next(error));
};

module.exports.delete = (req, res, next) => {
  const { id } = req.params;
  Story.findByIdAndDelete(id)
    .then((story) => {
      if (!story) next(createError(404, "Story not created"));
      else res.status(204).send();
    })
    .catch((error) => next(error));
};

module.exports.getFeaturedStories = (req, res, next) => {
  Story.find({ featured: true })
    .populate("author", "username")
    .then((featuredStories) => {
      res.json(featuredStories);
    })
    .catch(next);
};

module.exports.createComment = (req, res, next) => {
  Comment.create({
    text: req.body.text,
    user: req.user.id,
    story: req.params.id,
  })
    .then((comment) => res.status(201).json(comment))
    .catch(next);
};

module.exports.detailComment = (req, res, next) => {
  Comment.findById(req.params.commentId)
    .populate("user")
    .populate("story")
    .then((comment) => res.json(comment))
    .catch(next);
};

module.exports.getCategories = (req, res, next) => {
  Story.distinct("categories") 
    .then((categories) => res.json(categories))
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const { limit = 5, page = 0, title, author, category } = req.query;

  if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { limit: "Must be >= 0" },
      })
    );
  }
  if (Number.isNaN(Number(page)) || Number(page) < 0) {
    return next(
      createError(400, {
        message: "Invalid query parameter",
        errors: { page: "Must be >= 0" },
      })
    );
  }

  const criteria = {};
  if (title) criteria.title = new RegExp(title, "i");
  if (author) criteria.author = author;
  if (category) criteria.categories = category;

  Story.find(criteria)
    .limit(limit)
    .skip(limit * page)
    .populate("author", "username")
    .then((stories) => res.json(stories))
    .catch((error) => next(error));
};
