import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 5000;
const SERVER_URL = process.env.SERVER_URL || "http://localhost";
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/bookStoreDB";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () =>
  console.log(`Server is running on http://${SERVER_URL}:${PORT}`)
);
