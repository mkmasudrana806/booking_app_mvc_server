const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
require("dotenv").config();
const port = process.env.PORT || 5000;

// mongodb connection
const { connectMongoDb } = require("./connection");

// routes path
const userRoutes = require("./routes/userRoutes");

// middleware
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
app.use("/user", userRoutes);

// Database connection
connectMongoDb("mongodb://localhost:27017").then(() => {
  console.log("mongodb connected");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
