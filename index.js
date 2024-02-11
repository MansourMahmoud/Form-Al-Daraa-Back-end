const express = require("express");
var cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

//middleware for parsing JSON in request body
app.use(express.json());

// connect to database
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connect success");
  })
  .catch((error) => {
    console.log("mongodb can not access");
  });

const { ERROR } = require("./utils/httpStatusText");

// routes
const gmail = require("./routes/gmail.route"); // /api/gmail
const productForm = require("./routes/productsForm.route"); // /api/product-form

app.use("/api/gmail", gmail);
app.use("/api/product-form", productForm);

// end routes

// global middleware for not found router
app.all("*", (req, res) => {
  return res
    .status(404)
    .json({ status: ERROR, message: "this resource is not available" });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.code || 400).json({
    status: error.statusText || ERROR,
    message: error.message,
    code: error.code || 400,
  });
});

//start server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
