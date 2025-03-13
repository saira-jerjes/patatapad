const mongoose = require("mongoose");
const validator = require("validator");

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [10, "Title needs to be at least 10 characters"],
      maxLength: [150, "Title can't be longer than 150 characters"],
    },
    cover: {
      type: String,
      default: "",
      validate: {
        validator: validator.isURL,
        message: function () {
          return "Invalid cover URL";
        },
      },
    },
    extract: {
      type: String,
      required: true,
      minLength: [50, "Extract needs to be at least 50 characters"],
      maxLength: [1500, "Title can't be longer than 1500 characters"],
    },
    content: {
      type: String,
      required: true,
      minLength: [300, "Extract needs to be at least 300 characters"]
    },
        categories: [String],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    featured: {
      type: Boolean,
      default: false,
    },
    likesCount: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);
