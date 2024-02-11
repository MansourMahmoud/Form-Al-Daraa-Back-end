const express = require("express");
const {
  addProductForm,
  deleteProductForm,
  updateProductForm,
  getAllProductForm,
} = require("../controllers/product-form/productForm.controllers");
const router = express.Router();

router.route("/").get(getAllProductForm).post(addProductForm);
router
  .route("/:productFormId")
  .delete(deleteProductForm)
  .patch(updateProductForm);

module.exports = router;
