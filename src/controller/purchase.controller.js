const purchaseService = require("../cervices/purchase.service");
const httpStatus = require("http-status");

async function createPurchase(req, res) {
  const result = await purchaseService.createPurchase(req.body);
  res.send(result);
}
async function getPurchasees(req, res) {
  // pagination check & logic

  const result = await purchaseService.getPurchases(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Purchasees fetched successfully",
    data: result,
  });
}
//
async function updatePurchase(req, res) {
  const result = await purchaseService.updatePurchase({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deletePurchase(req, res) {
  const result = await purchaseService.deletePurchase(req.params.id);
  res.send(result);
}
//
module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchasees,
};
