const mongoose = require("mongoose");

const AlbumCommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    album: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Album",
    },
    comment: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likedUsers: {
      type: [mongoose.Types.ObjectId],
      default: [],
      ref: "User"
    },
  },{
    timestamps: true
  }
);

module.exports = mongoose.model("AlbumComment", AlbumCommentSchema);
