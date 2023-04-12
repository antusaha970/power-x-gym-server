const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const fs = require("fs-extra");
const path = require("path");
require("dotenv").config();

// For app usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cfh8khq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
);

// For routes
app.use("/", require(path.join(__dirname, "./Routes/UserRoutes/UserRoutes")));
app.use("/", require(path.join(__dirname, "./Routes/BlogPost/BlogPost")));
app.use(
  "/",
  require(path.join(__dirname, "./Routes/MemberMessage/MemberMessage"))
);
app.use("/", require(path.join(__dirname, "./Routes/sendEmail/sendEmail")));
app.use("/", require(path.join(__dirname, "./Routes/Admin/Admin")));

// Root call
app.get("/", (req, res) => {
  res.send("This is a public api for power-x-gym");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
