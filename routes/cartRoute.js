const express = require("express");
const router = express.Router();
const {
  getAllBooksInCart,
  insertBookToCart,
  deleteBookFromCart,
} = require("../controller/cartController.js");

router.get("/", (req, res) => {
  getAllBooksInCart()
    .then((booksInCart) => {
      res.json(booksInCart);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/", async(req, res) => {
  const {title,description,price,img} = req.body   
  // if (!(title && description && price && img))
  // res.status(400).send("All input is required");
 await insertBookToCart(title,description,price,img)
    .then((theBookChosen) => res.json(theBookChosen))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  deleteBookFromCart(_id)
    .then((bookRemoved) => {
      console.log(bookRemoved);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
