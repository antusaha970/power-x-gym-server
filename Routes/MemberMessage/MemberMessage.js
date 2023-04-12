const express = require("express");
const messageRouter = express.Router();
const ContactMessage = require("../../contactUs");
const mongoose = require("mongoose");

// Post contact us message to server
messageRouter.post("/userMessage", async (req, res) => {
  const message = req.body;
  try {
    const userMessage = new ContactMessage(message);
    await userMessage.save();
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send(false);
  }
});

// Get contact us messages
messageRouter.get("/memberMessages", async (req, res) => {
  try {
    const result = await ContactMessage.find();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

module.exports = messageRouter;
