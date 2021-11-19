const mongoose = require("mongoose");
const slugify = require("slugify");

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: false,
  },
});

articlesSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});
module.exports = mongoose.model("Article", articlesSchema);
