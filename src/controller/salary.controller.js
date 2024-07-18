const salaryService = require("../cervices/salary.service");
const httpStatus = require("http-status");

async function createSalary(req, res) {
  const result = await salaryService.createAddress(req.body);
  res.send(result);
}

async function getSalaries(req, res) {
  const result = await salaryService.getAddresses(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Salaries fetched successfully",
    data: result,
  });
}
//
async function updateSalary(req, res) {
  const result = await salaryService.updateAddress({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteSalary(req, res) {
  const result = await salaryService.deleteAddress(req.params.id);
  res.send(result);
}
//
module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaries,
};
