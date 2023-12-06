const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  viewedUsers: {
    type: [String],
    default: []
  },
  loveCount: {
    type: Number,
    default: 0
  },
  lovedUsers: {
    type: [String],
    default: []
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
  commentedUsers: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model("Blog", blogSchema);
