const expenseCategoryService = require("../cervices/expenseCategory.service");
const httpStatus = require("http-status");

async function createExpenseCategory(req, res) {
  const result = await expenseCategoryService.createExpenseCategory(req.body);
  res.send(result);
}
async function getExpenseCategories(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } = req.query;

  const result = await expenseCategoryService.getExpenseCategories({
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customers fetched successfully",
    data: result,
  });
}
//
async function updateExpenseCategory(req, res) {
  const result = await expenseCategoryService.updateExpenseCategory({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteExpenseCategory(req, res) {
  const result = await expenseCategoryService.deleteExpenseCategory(req.params.id);
  res.send(result);
}
//
module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
