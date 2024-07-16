const supplierService = require("../cervices/supplier.service");
const httpStatus = require("http-status");

async function createSupplier(req, res) {
  const result = await supplierService.createAddress(req.body);
  res.send(result);
}
async function getSuppliers(req, res) {
  // pagination check & logic

  const result = await supplierService.getAddresses(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully",
    data: result,
  });
}
//
async function updateSupplier(req, res) {
  const result = await supplierService.updateAddress({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteSupplier(req, res) {
  const result = await supplierService.deleteAddress(req.params.id);
  res.send(result);
}
//
module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
};
