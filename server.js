import express from "express";
import bookPath from "./routes/books.js";

const app = express();
app.use(express.json());
const PORT = 5000;

app.use("/api/books", bookPath);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
