const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const nodemailer = require("nodemailer");
const emailBody = require("./email");
require("dotenv").config();

// For app usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mongodb connection

// Replace the placeholder with your Atlas connection string
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.cfh8khq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(`${process.env.DATABASE_NAME}`).command({ ping: 1 });

    const database = client.db(`${process.env.DATABASE_NAME}`);
    const registeredUsersCollection = database.collection("registeredUsers");

    // For inserting registered user data in database
    app.post("/registerData", async (req, res) => {
      const userData = req.body;
      try {
        const result = await registeredUsersCollection.insertOne(userData);
        res.send(result.acknowledged);
      } catch (error) {
        console.log(error);
        res.send(error.message);
      }
    });

    app.post("/sendMail", async (req, res) => {
      const email = req.body.email;
      const plan = req.body.plan;
      const message = emailBody(email, plan || "Basic");
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
            console.log("Email sent: " + info.response);
            // do something useful
            res.send(true);
          }
        });
      } catch (error) {
        console.log(error);
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
