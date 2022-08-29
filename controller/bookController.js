const Book = require("../models/Book");
const addBook = (title, description, price,img) => {
  return new Promise((resolve, reject) => {
    let book = new Book({
      title,
      description,
      price,
      img
    });
    book.save((err, bookData) => {
      bookData ? resolve(bookData) : reject(err);
    });
  });
};

const getBook = (_id) => {
  return new Promise((resolve, reject) => {
    Book.findById(_id, (err, bookData) => {
      bookData ? resolve(bookData) : reject(err);
    });
  });
};

const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    Book.find().then((bookData) => {
      bookData ? resolve(bookData) : reject(err);
    });
  });
};

const updateBook = (_id, title, description, price,img) => {
  return new Promise((resolve, reject) => {
    Book.findByIdAndUpdate(_id, { $set: { title, description, price,img } })
      .then((bookData) => {
        resolve(bookData);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteBook = (_id) => {
  return new Promise((resolve, reject) => {
    Book.deleteOne(
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


module.exports = {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
