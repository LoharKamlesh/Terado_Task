const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    maxlength: [40, "User name must be less than 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide us your email"],
    unique: [true, "email must be unique"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be atleast 8 character long"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    //custorm validator
    validate: {
      // This works only on .create() and .save()
      validator: function (el) {
        return el === this.password;
      },
      message: "Password are not the same!",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//use pre save middleware to encrypt password
userSchema.pre("save", async function (next) {
  //'this' here on document is the user
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12); //hash is async function

  this.passwordConfirm = undefined; //we dont want to persist passwordConfirm to database we just need it in early stages to validate user entered password
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
