const mongoose = require("mongoose");

const SongCommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    song: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Song",
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

module.exports = mongoose.model("SongComment", SongCommentSchema);
