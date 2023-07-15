const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Data = require("./models/db");
const cors = require("cors")

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Define an endpoint to fetch data
app.get("/dashboard", (req, res) => {
  // Fetch data from the MongoDB collection
  Data.find({})
    .exec()
    .then((data) => {
      console.log("Received data:");
      

      // Send the data as a response to the frontend
      res.json(data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Error fetching data" });
    });
});

// Start the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});