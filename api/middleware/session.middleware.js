const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    req.user = undefined;
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        if (!user) {
          delete req.session.userId;
        } else {
          req.user = user;
        }
        next();
      })
      .catch((error) => next(error));
  }
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user && req.user.id) {
    next();
  } else {
    next(createError(401, "Unauthorized, missing credentials"));
  }
};

module.exports.isGuest = (req, res, next) => {
  if (req.user.role === "guest") {
    next();
  } else {
    next(createError(403, "To see this, you have to sign up"));
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next(createError(403, "Forbidden action!"));
  }
};
