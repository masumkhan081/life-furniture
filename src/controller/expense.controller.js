const CustomerService = require("../cervices/customer.service");
const httpStatus = require("http-status");

async function createExpense(req, res) {
  const result = await CustomerService.createCustomer(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer Created successfully",
    data: result,
  });
}
async function getExpenses(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } = req.query;

  const result = await CustomerService.getCustomers({
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
async function updateExpense(req, res) {
  const result = await CustomerService.updateCustomer({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteExpense(req, res) {
  const result = await CustomerService.deleteCustomer(req.params.id);
  res.send(result);
}
//
module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
