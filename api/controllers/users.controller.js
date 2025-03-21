const createError = require("http-errors");
const User = require("../models/user.model");
const { EMAIL_PATTERN } = require("../models/user.model");
const { PASSWORD_PATTERN } = require("../models/user.model");


module.exports.create = (req, res, next) => {
  const { email, username, password } = req.body;

  if (!username) {
    return next(createError(400, "Username is required"));
  }

  if (!EMAIL_PATTERN.test(email)) {
    return next(createError(400, "Invalid email format"));
  }

  if (!PASSWORD_PATTERN.test(password)) {
    return next(createError(400, "Password must be at least 8 characters"));
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return next(
          createError(400, {
            message: "User email already taken",
            errors: { email: "Already exists" },
          })
        );
      } else {
        return User.create({
          username,
          email,
          password,
          role: "user",
        }).then((user) => {
          res.status(201).json(user);
        });
      }
    })
    .catch((error) => next(error));
};


module.exports.update = (req, res, next) => {
  const permittedBody = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    avatar: req.body.avatar,
  };

  const filteredBody = Object.fromEntries(
    Object.entries(permittedBody).filter(([_, value]) => value !== undefined)
  );

  Object.assign(req.user, filteredBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.verifyUpdatePermission = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.id) {
    return next(
      createError(403, "Forbidden: You don't have permission to update")
    );
  }
  next();
};

module.exports.validate = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found"));
      }
      user.active = true;
      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.listAll = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  if (!req.user) { 
    return next(createError(401, "No autenticado"));
  }

  User.findById(req.user.id) 
    .populate("writtenStories") 
    .then((user) => {
      if (!user) {
        return next(createError(404, "User not found"));
      }
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        writtenStories: user.writtenStories,
      });
    })
    .catch(next);
};

module.exports.getWrittenStories = (req, res, next) => {
  const userId = req.params.id;
  console.log('userId:', userId); 
  User.findById(userId)
    .then(user => {
      if (!user) {
        return next(createError(404, "User not found"));
      }
      return user.writtenStories;
    })
    .then(writtenStories => res.json(writtenStories))
    .catch(next);
};

