const expenseCategoryService = require("../cervices/expenseCategory.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createExpenseCategory(req, res) {
  const result = await expenseCategoryService.createExpenseCategory(req.body);
  res.send(result);
}
async function getExpenseCategories(req, res) {
  const result = await expenseCategoryService.getExpenseCategories(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Expense categories"),
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
  const result = await expenseCategoryService.deleteExpenseCategory(
    req.params.id
  );
  res.send(result);
}
//
module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
