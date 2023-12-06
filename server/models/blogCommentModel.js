const mongoose = require("mongoose");

const BlogCommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    loveCount: {
      type: Number,
      default: 0,
    },
    lovedUsers: {
      type: [String],
      default: []
    }
  },{
    timestamps: true
  }
);

module.exports =  mongoose.model("BlogComment", BlogCommentSchema);
