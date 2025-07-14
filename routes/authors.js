import express from "express";
import Author, {
  createAuthorSchema,
  updateAuthorSchema,
} from "../models/Authors.js";
const router = express.Router();

function validateAuthor(obj, res, schema) {
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

function catchMethodError(res) {
  return res.status(500).json({
    message: "Internal Server Error",
  });
}

/**
@route   GET /api/authors
@desc    Get all authors
@access  Public
*/
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    catchMethodError(res);
  }
});

/**
@route   GET /api/authors/id
@desc    Get author by id
@access  Public
*/
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({
        message: "Author not found",
      });
    }
  } catch (error) {
    catchMethodError(res);
  }
});

/**
@route   POST /api/authors/
@desc    Create a new author
@access  Public
*/
router.post("/", async (req, res) => {
  const isValid = validateAuthor(req.body, res, createAuthorSchema);
  if (!isValid) return;

  const author = Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    photo: req.body.photo,
  });
  await author.save();

  res.status(201).json(author);
});

/**
@route   PUT /api/authors/:id
@desc    Update a new author
@access  Public
*/
router.put("/:id", async (req, res) => {
  const isValid = validateAuthor(req.body, res, updateAuthorSchema);
  if (!isValid) return;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          photo: req.body.photo,
        },
      },
      {
        new: true,
      }
    );
    if (updatedAuthor) {
      res.status(200).json({ message: "Author has been updated" });
    } else {
      res.status(400).json({ message: "Author is not found" });
    }
  } catch (error) {
    catchMethodError(res);
  }
});

/**
@route   Delete /api/authors/:id
@desc    Delete a author
@access  Public
*/
router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (author) {
      res.status(200).json({ message: "Author has been updated" });
    } else {
      res.status(400).json({ message: "Author is not found" });
    }
  } catch (error) {
    catchMethodError(res);
  }
});

export default router;
