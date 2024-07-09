const shopServices = require("../services/shop.service");
const httpStatus = require("http-status");

async function createShop(req, res) {
  const result = await shopServices.createShop(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop Created successfully",
    data: result,
  });
}
async function getShops(req, res) {
  const result = await shopServices.getShops();
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Shops fetched successfully",
    data: result,
  });
}
async function updateShop(req, res) { 
  const result = await shopServices.updateShop({
    id: req.params.id,
    data: req.body,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
}
async function deleteShop(req, res) {
  const result = await shopServices.deleteShop(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop deleted successfully",
    data: result,
  });
}

module.exports = { createShop, updateShop, deleteShop, getShops };
