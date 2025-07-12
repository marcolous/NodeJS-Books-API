import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      mixlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      mixlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      mixlength: 100,
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

export default Author;
