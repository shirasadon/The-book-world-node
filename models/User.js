const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userPhone: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "minimum password length is 6 characters"],
    },
    biz: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
    next();
  } catch (error) {
    next(error);
  }
});

// userSchema.methods.generateAuthToken = async function () {
//   //try using Camel notation here(User(U with uppercase))
//   const User = this;
//   const token = jwt.sign({ _id: User._id.toString() }, "thisisnewcourse");
//   console.log(token);
//   return token;
// };
// generateAuthToken
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().min(5).max(1024).required(),
    userPhone: Joi.string().min(5).max(1024).required(),
    userEmail: Joi.string().min(3).max(60).required().email(),
    password: Joi.string().min(2).max(400).required(),
    biz: Joi.required(),
  });

  return schema.validate(user);
}
exports.User = User;
exports.validateUser = validateUser;
