const expenseService = require("../cervices/expense.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createExpense(req, res) {
  const result = await expenseService.createExpense(req.body);
  res.send(result);
}
async function getExpenses(req, res) {
  const result = await expenseService.getExpenses(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Expenses"),
    data: result,
  });
}
//
async function updateExpense(req, res) {
  const result = await expenseService.updateExpense({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteExpense(req, res) {
  const result = await expenseService.deleteExpense(req.params.id);
  res.send(result);
}
//
module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
