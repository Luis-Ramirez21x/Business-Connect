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
  password: {
    type: String,
    required: true,
  },

  myBusiness: [
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
  following:[
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },
  ],
});

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Initialize our User model
const User = model("User", userSchema);

module.exports = User;
