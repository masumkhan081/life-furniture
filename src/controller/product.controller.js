const productService = require("../cervices/product.service");
const httpStatus = require("http-status");

async function createProduct(req, res) {
  const result = await productService.createProduct(req.body);
  res.send(result);
}

async function getProducts(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } = req.query;

  const result = await productService.getProducts({
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
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
