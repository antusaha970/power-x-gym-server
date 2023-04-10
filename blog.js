const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  blogBody: String,
  author: String,
  image: Object,
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
