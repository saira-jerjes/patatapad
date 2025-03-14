const mongoose = require("mongoose");
require("dotenv").config();
const { isURL } = require("../validators/string.validators");
const bcrypt = require("bcryptjs");
const Story = require("./story.model");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase());

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      maxLength: [30, "Username characters must be lower than 30"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "User email is required"],
      match: [EMAIL_PATTERN, "Invalid user email pattern"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      match: [PASSWORD_PATTERN, "Invalid user password pattern"],
    },
    bio: {
      type: String,
      minLength: [300, "Bio must be at least 300 characters"],
      maxLength: [500, "Bio can't be more than 500 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "guest", "user"],
      default: "guest",
    },
    writtenStories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret._id;
        delete ret.password;
        delete ret.activateToken;

        ret.id = doc.id;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  if (ADMIN_EMAILS.includes(this.email)) {
    this.role = "admin";
  }

  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

module.exports = mongoose.model("User", userSchema);
module.exports.EMAIL_PATTERN = EMAIL_PATTERN;
module.exports.PASSWORD_PATTERN = PASSWORD_PATTERN;
