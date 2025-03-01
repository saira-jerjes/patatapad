const createError = require("http-errors");
const User = require("../models/user.model");
const { sendValidationEmail } = require("../config/mailer.config");

module.exports.create = (req, res, next) => {
  const { email, username, password } = req.body;

 if (!username) {
    return next(createError(400, "Username is required"));
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(
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
          role: req.body.role || 'guest',
        }).then((user) => {
          sendValidationEmail(user);
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

  // remove undefined keys
  Object.keys(permittedBody).forEach((key) => {
    if (permittedBody[key] === undefined) {
      delete permittedBody[key];
    }
  });

  module.exports.verifyUpdatePermission = (req, res, next) => {
    if (req.user.role !== 'admin') {
      if (req.user.id !== req.params.id) {
        return next(createError(403, "Forbidden: You don't have permission to update"));
      }
    }
    next();
  };
  
  // merge body into req.user object
  Object.assign(req.user, permittedBody);

  req.user
    .save()
    .then((user) => res.json(user))
    .catch(next);
};



module.exports.validate = (req, res, next) => {
  User.findOne({ _id: req.params.id, activateToken: req.query.token })
    .then((user) => {
      if (user) {
        user.active = true;
        user.save().then((user) => res.json(user));
      } else {
        next(createError(404, "User not found"));
      }
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
  res.json(req.user);
};