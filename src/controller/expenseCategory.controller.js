const CustomerService = require("../cervices/customer.service");
const httpStatus = require("http-status");

async function createCustomer(req, res) {
  const result = await CustomerService.createCustomer(req.body);

  console.log(">> " + JSON.stringify(result));

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer Created successfully",
    data: result,
  });
}
async function getCustomers(req, res) {
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
async function updateCustomer(req, res) {
  const result = await CustomerService.updateCustomer({
    id: req.params.id,
    data: req.body,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
}
//
async function deleteCustomer(req, res) {
  const result = await CustomerService.deleteCustomer(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
}
//
module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
