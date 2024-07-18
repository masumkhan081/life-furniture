const supplierService = require("../cervices/supplier.service");
const httpStatus = require("http-status");

async function createSupplier(req, res) {
  const result = await supplierService.createSupplier(req.body);
  res.send(result);
}
async function getSuppliers(req, res) {
  // pagination check & logic

  const result = await supplierService.getSuppliers(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully",
    data: result,
  });
}
//
async function updateSupplier(req, res) {
  const result = await supplierService.updateSupplier({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteSupplier(req, res) {
  const result = await supplierService.deleteSupplier(req.params.id);
  res.send(result);
}
//
module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
};
