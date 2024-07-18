const addressService = require("../cervices/address.service");
const httpStatus = require("http-status");

async function createAddress(req, res) {
  const result = await addressService.createAddress(req.body);
  res.send(result);
}
async function getAddresses(req, res) {
  

  const result = await addressService.getAddresses(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully",
    data: result,
  });
}
//
async function updateAddress(req, res) {
  const result = await addressService.updateAddress({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteAddress(req, res) {
  const result = await addressService.deleteAddress(req.params.id);
  res.send(result);
}
//
module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
