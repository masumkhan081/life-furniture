const productCategoryService = require("../cervices/productCategory.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createProductCategory(req, res) {
  const result = await productCategoryService.createProductCategory(req.body);

  res.send(result);
}
async function getProductCategories(req, res) {
  const result = await productCategoryService.getProductCategories(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Product categories"),
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
