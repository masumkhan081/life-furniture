const salesmanService = require("../cervices/salesman.service");
const httpStatus = require("http-status");

async function createSalesman(req, res) {
  const result = await salesmanService.createSalesman(req.body);
  res.send(result);
}
async function getSalesmen(req, res) {
  // pagination check & logic

  const result = await salesmanService.getSalesmen(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully",
    data: result,
  });
}
//
async function updateSalesman(req, res) {
  const result = await salesmanService.updateSalesmen({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteSalesman(req, res) {
  const result = await salesmanService.deleteSalesman(req.params.id);
  res.send(result);
}
//
module.exports = {
  createSalesman,
  updateSalesman,
  deleteSalesman,
  getSalesmen,
};
