const User = require("../models/user.model.js");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user || !user.checkPassword(password)) {
        throw createError(401, "Invalid email or password");
      }

      req.session.userId = user._id; 
      res.status(200).json({ message: "Logged in successfully" });
    })
    .catch(next);
};

module.exports.destroy = (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
};
