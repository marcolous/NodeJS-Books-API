import express from "express";
import Joi from "joi";
import Author from "../models/Authors.js";
const router = express.Router();

const createAuthorSchema = Joi.object({
  firstName: Joi.string().trim().min(3).required(),
  lastName: Joi.string().trim().min(3).required(),
  nationality: Joi.string().trim().min(3).required(),
  photo: Joi.string().trim().min(3).required(),
});
const updateAuthorSchema = Joi.object({
  firstName: Joi.string().trim().min(3),
  lastName: Joi.string().trim().min(3),
  nationality: Joi.string().trim().min(3),
  photo: Joi.string().trim().min(3),
});

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

/**
@route   GET /api/authors
@desc    Get all authors
@access  Public
*/
router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
@route   GET /api/authors/id
@desc    Get author by id
@access  Public
*/
router.get("/:id", (req, res) => {
  const author = authors.find((b) => b.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({
      message: "Author not found",
    });
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
router.put("/:id", (req, res) => {
  const isValid = validateAuthor(req.body, res, updateAuthorSchema);
  if (!isValid) return;

  const author = authors.find((b) => b.id === req.body.id);

  if (author) {
    res.status(200).json({ message: "Author has been updated" });
  } else {
    res.status(400).json({ message: "Author is not found" });
  }
});

/**
@route   Delete /api/authors/:id
@desc    Delete a author
@access  Public
*/
router.delete("/:id", (req, res) => {
  const author = authors.find((b) => b.id === req.body.id);

  if (author) {
    res.status(200).json({ message: "Author has been updated" });
  } else {
    res.status(400).json({ message: "Author is not found" });
  }
});

export default router;
