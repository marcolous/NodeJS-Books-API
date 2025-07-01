import express from "express";
import Joi from "joi";

const router = express.Router();

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "A journey of a shepherd boy to find his destiny.",
    price: 10.99,
    cover: "https://example.com/alchemist.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "An easy & proven way to build good habits and break bad ones.",
    price: 14.99,
    cover: "https://example.com/atomic-habits.jpg",
  },
];

const schema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  author: Joi.string().trim().min(3).required(),
  description: Joi.string().trim().min(3).required(),
  price: Joi.number().min(0).required(),
  cover: Joi.string().trim().min(3).required(),
});
/**
 * @route   GET /api/books
 * @desc    Get all books
 * @access  Public
 */
router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @route   GET /api/books/id
 * @desc    Get book by id
 * @access  Public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

/**
 * @route   POST /api/books/
 * @desc    Create a new book
 * @access  Public
 */
router.post("/", (req, res) => {
  const isValid = schemaValidation(req.body, res);
  if (!isValid) return;

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  books.push(book);
  res.status(201).json(book);
});

function schemaValidation(obj, res) {
  const { error } = schema.validate(obj, { abortEarly: false });
  if (error) {
    res.status(400).json({
      status: 400,
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
    return false;
  }
  return true;
}

export default router;
