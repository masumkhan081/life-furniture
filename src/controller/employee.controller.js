const employeeService = require("../cervices/employee.service");
const httpStatus = require("http-status");

async function createEmployee(req, res) {
  const result = await employeeService.createEmployee(req.body);
  res.send(result);
}
async function getEmployees(req, res) {
  const result = await employeeService.getEmployees(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Employees fetched successfully",
    data: result,
  });
}
//
async function updateEmployee(req, res) {
  const result = await employeeService.updateEmployee({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteEmployee(req, res) {
  const result = await employeeService.deleteEmployee(req.params.id);
  res.send(result);
}
//
module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
