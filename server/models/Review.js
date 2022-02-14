const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        let dateObj = new Date(date);
        let dateString = dateObj.toDateString();
        let timeString = dateObj.toTimeString();
        return `${dateString} @ ${timeString}`;
      },
    },
    userName:{
      type:String,
      required: true,
    },
    rating:{
      type: Number,
      //required: true
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },

  },
  {
    toJSON: {
      getters: true,
    },

    id: false,

  }
);

// Initialize our Tag model
const Review = model("Review", reviewSchema);

module.exports = Review;
