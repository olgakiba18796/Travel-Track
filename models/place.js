const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const placeSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  coords: {
    lat: Number,
    lng: Number
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = model("Place", placeSchema);
