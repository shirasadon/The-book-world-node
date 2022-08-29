const express = require("express");
const router = express.Router();

const {
  addBookWishlist,
  getAllBookWishlist,
  deleteOneBookWishlist,
} = require("../controller/wishlistController");

router.post("/", (req, res) => {
  const { title, description } = req.body.bookToWishlist;
  addBookWishlist(title, description)
    .then((booksInWishlist) => {
      res.json(booksInWishlist);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/", (req, res) => {
  const { title, description } = req.body;
  getAllBookWishlist(title, description)
    .then((wishlistData) => res.json(wishlistData))
    .catch((err) => res.json(err));
});

router.delete("/:delById", (req, res) => {
  deleteOneBookWishlist(req.params.delById)
    .then((wishlistData) => res.json(wishlistData))
    .catch((error) => res.json(error));
});
module.exports = router;
