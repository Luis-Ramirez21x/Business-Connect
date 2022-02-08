const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Schema to create Post model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validateEmail, "Please input a valid email address."],
  },
  hashed_password: {
    type: String,
    required: true,
  },
  businesses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

userSchema.virtual("password").set(function (password) {
  this.hashed_password = bcrypt.hashSync(password, 12);
});

userSchema.methods.isCorrectPassword = function (given_password) {
  return bcrypt.compareSync(given_password, this.hashed_password);
};

// Initialize our User model
const User = model("user", userSchema);

module.exports = User;
