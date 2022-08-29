const mongoose = require("mongoose");
const WishlistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "The filed title is a required filed!",
    },
    description: {
      type: String,
      required: "The filed description is a required filed!",
    },
  },
  {
    timestamps: true,
  }
);
WishlistSchema.methods.testFunc = function testFunc(params) {};
const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = Wishlist;
