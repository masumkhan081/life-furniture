const productCategoryService = require("../cervices/productCategory.service");
const httpStatus = require("http-status");

async function createProductCategory(req, res) {
  const result = await productCategoryService.createProductCategory(req.body);

  res.send(result);
}
async function getProductCategories(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } = req.query;

  const result = await productCategoryService.getProductCategories({
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "ProductCategorys fetched successfully",
    data: result,
  });
}
//
async function updateProductCategory(req, res) {
  const result = await productCategoryService.updateProductCategory({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteProductCategory(req, res) {
  const result = await productCategoryService.deleteProductCategory(
    req.params.id
  );
  res.send(result);
}
//
module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategories,
};
