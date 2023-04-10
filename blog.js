const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  blogBody: String,
  author: String,
  image: Object,
  publishDate: {
    type: Date,
    default: new Date(),
  },
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
