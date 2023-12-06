const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    given_name: {
      type: String,
      required: true,
    },
    family_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: true,
    },
    email_verified: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isArtist: {
      type: Boolean,
      default: false,
    },
    nick: {
      type: String,
    },
    quote: {
      type: String,
    },
    role: {
      type: String,
    },
    bio: {
      type: String,
    },
    title: {
      type: String,
    },
    artist: {
      type: mongoose.Types.ObjectId,
      ref: "Artist",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    playlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
    }],
  },{
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
