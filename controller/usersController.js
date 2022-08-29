const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const addUser = async (userName, userPhone, userEmail, password, biz) => {
  return new Promise((resolve, reject) => {
    let user = new User({
      userName,
      userPhone,
      userEmail,
      password,
      biz,
    });

    user.save((err, userData) => {
      userData ? resolve(userData) : reject(err);
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find().then((userData) => {
      userData ? resolve(userData) : reject(err);
    });
  });
};

const generateAuthToken = (user) => {
  return jwt.sign({ user_id: user._id, biz: user.biz }, "YourPrivateKey", {
    expiresIn: "311111m",
  });
};
module.exports = {
  addUser,
  getAllUsers,
  generateAuthToken,
};
