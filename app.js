import express from "express";
import bookPath from "./routes/books.js";
import authorPath from "./routes/authors.js";



const app = express();
app.use(express.json());

app.use("/api/books", bookPath);
app.use("/api/authors", authorPath);

export default app;
