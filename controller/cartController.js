const { reject } = require("lodash");
const { resolve } = require("path");
const Cart = require("../models/Cart");

const getAllBooksInCart = () => {
  return new Promise((resolve, reject) => {
    Cart.find()
      .then((booksInCart) => resolve(booksInCart))
      .catch((err) => reject(err));
  });
};

const insertBookToCart = (title,description,price,img) => {
  return new Promise((resolve, reject) => {
    const cart = new Cart({
      title,
      description,
      price,
      img
    } );
    cart
      .save()
      .then((theBookChosen) => {
        resolve(theBookChosen);
      })
      .catch((err) => reject(err));
  });
};

const deleteBookFromCart = (_id) => {
  return new Promise((resolve, reject) => {
    Cart.deleteOne(
      {},
      {
        _id,
      },
      (err, bookData) => {
        err ? reject(err) : resolve(bookData);
      }
      );
    });
  };

module.exports = { getAllBooksInCart, insertBookToCart, deleteBookFromCart };
