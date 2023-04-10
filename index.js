const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const nodemailer = require("nodemailer");
const emailBody = require("./email");
const mongoose = require("mongoose");
const User = require("./user");
const Blog = require("./blog");
const fileUpload = require("express-fileupload");
const fs = require("fs-extra");

require("dotenv").config();

// For app usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cfh8khq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
);

// To Get All Registered Users info
app.get("/allUserInfo", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// For inserting registered user data in database
app.post("/registerData", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = new User(userData);
    await newUser.save();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

// To get all registered user information
app.get("/allUserInfo", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Blog post Data
app.post("/postBlog", async (req, res) => {
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
app.get("/blogData", async (req, res) => {
  try {
    const blogData = await Blog.find();
    res.send(blogData);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

// Root directory
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// For admin checking
app.post("/isAdmin", async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  if (
    email === `${process.env.ADMIN_PANEL_EMAIL}` &&
    pass === `${process.env.ADMIN_PANEL_PASSWORD}`
  ) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// For sending mail to the users
app.post("/sendMail", async (req, res) => {
  const email = req.body.email;
  const plan = req.body.plan;
  const payment = req.body.payment;
  const message = emailBody(email, plan || "Basic", payment);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.ADMIN_EMAIL}`,
        pass: `${process.env.ADMIN_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.ADMIN_EMAIL}`,
      to: `${email}`,
      subject: "Thank you for choosing Power-X-Gym!",
      html: `${message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // do something useful
        res.send(true);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
