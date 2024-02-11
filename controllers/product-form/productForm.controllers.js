const asyncWrapper = require("../../middleware/asyncWrapper");
const ProductForm = require("../../models/productForm.model");
const appError = require("../../utils/appError");
const { FAIL, SUCCESS } = require("../../utils/httpStatusText");
const returnJson = require("../../utils/returnJson");

const getAllProductForm = asyncWrapper(async (req, res, next) => {
  const allProductForm = await ProductForm.find();

  return returnJson(
    res,
    201,
    SUCCESS,
    "Product form has been successfully retrieved.",
    { productsForm: allProductForm }
  );
});

const addProductForm = asyncWrapper(async (req, res, next) => {
  const { typeOfProduct, productName, price } = req.body;

  if (!typeOfProduct) {
    const error = appError.create("typeOfProduct is required", 400, FAIL);
    next(error);
  } else if (!productName) {
    const error = appError.create("productName is required", 400, FAIL);
    next(error);
  } else if (!price) {
    const error = appError.create("price is required", 400, FAIL);
    next(error);
  }

  const addProductForm = await ProductForm.create({
    typeOfProduct,
    productName,
    price,
  });
  console.log(addProductForm);

  return returnJson(
    res,
    201,
    SUCCESS,
    "product form has been added successfully",
    { productForm: addProductForm }
  );
});

const deleteProductForm = asyncWrapper(async (req, res, next) => {
  const { productFormId } = req.params;

  const oldProductForm = await ProductForm.findOne({ _id: productFormId });

  if (!oldProductForm) {
    const error = appError.create("product form not found", 400, FAIL);
    next(error);
  }

  const deleteProductForm = await ProductForm.deleteOne({
    _id: productFormId,
  });

  return returnJson(
    res,
    200,
    SUCCESS,
    "product form has been deleted successfully",
    { productForm: null }
  );
});

const updateProductForm = asyncWrapper(async (req, res, next) => {
  const { productFormId } = req.params;

  const oldProductForm = await ProductForm.findOne({ _id: productFormId });

  if (!oldProductForm) {
    const error = appError.create("product form not found", 400, FAIL);
    next(error);
  }

  await ProductForm.updateOne(
    {
      _id: productFormId,
    },
    { ...req.body }
  );
  const updatedProductForm = await ProductForm.findOne({ _id: productFormId });

  return returnJson(
    res,
    200,
    SUCCESS,
    "product form has been updated successfully",
    { productForm: updatedProductForm }
  );
});

module.exports = {
  getAllProductForm,
  addProductForm,
  deleteProductForm,
  updateProductForm,
};
