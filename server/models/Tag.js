const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  businesses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

// Initialize our Tag model
const Tag = model("tag", tagSchema);

module.exports = Tag;
