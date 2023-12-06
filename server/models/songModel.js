const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  artist: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Artist",
  },
  title: {
    type: String,
    required: true
  },
  lyrics: {
    type: String,
  },
  date: {
    type: Date,
    required: true
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: "Album",
  },
  cover: {
    type: String,
    required: true
  },
  song: {
    type: String,
    required: true
  },
  playCount: {
    type: Number,
    default: 0
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  downloadedUsers: {
    type: [String],
    default: [],
  },
  loveCount: {
    type: Number,
    default: 0
  },
  lovedUsers: {
    type: [String],
    default: [],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model("Song", songSchema);
