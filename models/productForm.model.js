const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  typeOfProduct: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("ProductForm", cartSchema);
