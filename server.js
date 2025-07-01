import express from "express";

const app = express();
const PORT = 5000;

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
  },
];

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
