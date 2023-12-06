const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
  },{
    timestamps: true
  }
);

module.exports = mongoose.model("Category", CategorySchema);
