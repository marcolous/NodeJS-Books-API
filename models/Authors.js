import mongoose from "mongoose";
import Joi from "joi";

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    photo: {
      type: String,
      default: "https://example.com/default-photo.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);
const createAuthorSchema = Joi.object({
  firstName: Joi.string().trim().min(3).max(200).required(),
  lastName: Joi.string().trim().min(3).max(200).required(),
  nationality: Joi.string().trim().min(3).max(100).required(),
  photo: Joi.string().trim().uri(),
});

const updateAuthorSchema = Joi.object({
  firstName: Joi.string().trim().min(3).max(200),
  lastName: Joi.string().trim().min(3).max(200),
  nationality: Joi.string().trim().min(3).max(100),
  photo: Joi.string().trim().uri(),
});

export default Author;
export { createAuthorSchema, updateAuthorSchema };
