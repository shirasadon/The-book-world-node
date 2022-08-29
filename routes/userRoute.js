const express = require("express");
const router = express.Router();
const { addUser, getAllUsers } = require("../controller/usersController");
const { User, validateUser } = require("../models/User");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ userEmail: req.body.userEmail });
  if (user) return res.status(400).send("User already registered.");
  let { userName, userPhone, userEmail, password, biz } = req.body;

  await addUser(userName, userPhone, userEmail, password, biz)
    .then((userDate) => {
      res.json(userDate);
    })
    .catch((error) => {
      res.json(error);
    });
  console.log(req.body);
});

router.get("/", (req, res) => {
  getAllUsers()
    .then((userDate) => {
      res.json(userDate);
    })
    .catch((error) => res.json(error));
});

module.exports = router;
