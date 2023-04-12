const express = require("express");
const EmailRouter = express.Router();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const emailBody = require("./email");
require("dotenv").config();

// For sending mail to the users
EmailRouter.post("/sendMail", async (req, res) => {
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

module.exports = EmailRouter;
