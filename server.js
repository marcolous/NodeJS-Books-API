import express from "express";
import Joi from "joi";

const app = express();
app.use(express.json());
const PORT = 5000;
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

app.get("/api/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      message: "Book not found",
    });
  }
});

app.post("/api/books", (req, res) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
  };

  res.status(201).json(book);
  books.push(book);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
