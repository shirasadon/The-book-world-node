const mongoose = require("mongoose");
const Joi = require("joi");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "The filed title is a required filed!",
    },
    description: {
      type: String,
      required: "The filed description is a required filed!",
    },
    price: {
      type: Number,
      required: "The filed price is a required filed!",
    },
    img:{
      type: String,
      required: "The filed img is a required filed!",
    }
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(60).required(),
    description: Joi.string().min(5).max(1024).required(),
    price: Joi.string().min(2).max(400).required(),
     img:Joi.string().required()
  });

  return schema.validate(book);
}
exports.validateBook = validateBook;
module.exports = Book;
