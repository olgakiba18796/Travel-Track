const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place"
    }
  ]
});

module.exports = model("User", userSchema);
