const { Schema, model } = require("mongoose");
const Business = require("./Business");

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Initialize our Tag model
const Tag = model("tag", tagSchema);

module.exports = Tag;
