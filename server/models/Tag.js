const { Schema, model } = require("mongoose");
const Business = require('./Business');

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  businesses: [Business.schema],
});

// Initialize our Tag model
const Tag = model("tag", tagSchema);

module.exports = Tag;
