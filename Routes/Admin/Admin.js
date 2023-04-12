const express = require("express");
const AdminRouter = express.Router();

// For admin checking
AdminRouter.post("/isAdmin", async (req, res) => {
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

module.exports = AdminRouter;
