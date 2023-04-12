const express = require("express");
const blogRouter = express.Router();
const Blog = require("../../blog");
const mongoose = require("mongoose");

// Blog post Data
blogRouter.post("/postBlog", async (req, res) => {
  const blogImg = req.files.file.data;
  const encodedImg = blogImg.toString("base64");
  const image = {
    contentType: req.files.file.mimetype,
    size: req.files.file.size,
    img: Buffer.from(encodedImg, "base64"),
  };
  const blogDataForm = req.body.blogData;
  const blogData = JSON.parse(blogDataForm);
  const dataToStore = { ...blogData, image };
  try {
    const newBlog = new Blog(dataToStore);
    await newBlog.save();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

// Get all blog posts data
blogRouter.get("/blogData", async (req, res) => {
  try {
    const blogData = await Blog.find();
    res.send(blogData);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

// Get a specific blog
blogRouter.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    res.send(blog);
  } catch (error) {
    console.log(error);
  }
});

// Delete a blog post
blogRouter.post("/deleteBlog", async (req, res) => {
  const id = req.body.id;
  try {
    await Blog.deleteOne({ _id: id });
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(404).send(false);
  }
});

module.exports = blogRouter;
