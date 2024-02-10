// index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/customerRoutes");
app.use(express.json());
const port = 4000;

app.use(cors());

// .env file config
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// ==================================== Route File ================================================
app.use("/api", authRoutes); // Use authentication routes
app.use("/api", userRoutes); // Use user routes with

app.get("/", (req, res) => {
  res.send("Backend Api");
});
app.listen(port, () => {
  console.log(`server start http://localhost:${port}`);
});
