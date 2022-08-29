const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/User");
const express = require("express");
const router = express.Router();
const { generateAuthToken } = require("../controller/usersController");

router.post("/", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    if (!(userEmail && password)) res.status(400).send("All input is required");

    const user = await User.findOne({ userEmail });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateAuthToken(user._doc);
      res.status(200).json({ token, user });
    } else
      res
        .status(400)
        .send("Invalid Credentials  !! Check your email and password please!!");
  } catch (err) {
    res.status(400).send(err);
  }
});

function validateUser(req) {
  const schema = Joi.object({
    userEmail: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;
