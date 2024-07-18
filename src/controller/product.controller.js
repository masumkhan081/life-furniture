const productService = require("../cervices/product.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createProduct(req, res) {
  const result = await productService.createProduct(req.body);
  res.send(result);
}

async function getProducts(req, res) {
  const result = await productService.getProducts(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Products"),
    data: result,
  });
}
//
async function updateProduct(req, res) {
  const result = await productService.updateProduct({
    id: req.params.id,
    data: req.body,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
}
//
async function deleteProduct(req, res) {
  const result = await productService.deleteProduct(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
}
//
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
