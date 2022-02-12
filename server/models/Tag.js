const { Schema, model } = require("mongoose");
//const Business = require("./Business");

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
const Tag = model("Tag", tagSchema);

module.exports = Tag;
