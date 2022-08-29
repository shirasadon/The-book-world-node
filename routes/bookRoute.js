const express = require("express");
const router = express.Router();
const auth = require("../middleware/authication");

const {
  addBook,
  getBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controller/bookController");
const { validateBook } = require("../models/Book");

router.post("/",auth, async(req, res) => {
  const { title, description, price,img } = req.body;
  if (!(title && description && price && img))
     res.status(400).send("All input is required");
 await addBook(title, description, price,img)
    .then((bookDate) =>{
      res.json(bookDate)
    } )
    .catch((error) => {
      res.json(error)
    });
});




router.get("/:theid", auth, (req, res) => {
  getBook(req.params.theid)
    .then((bookDate) => {
      res.json(bookDate);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/", auth, (req, res) => {
  getAllBooks()
    .then((bookDate) => {
      res.json(bookDate);
    })
    .catch((error) => res.json(error));
});

router.put("/:id", auth, (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const img = req.body.img;
  updateBook(id, title, description, price,img)
    .then((bookDate) => {
      console.log(bookDate);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/:id", auth, (req, res) => {
  const _id = req.params.id;
  deleteBook(_id)
    .then((bookDate) => {
      console.log(_id);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;


