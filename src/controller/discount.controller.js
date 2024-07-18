const discountService = require("../cervices/discount.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createDiscount(req, res) {
  const result = await discountService.createDiscount(req.body);
  res.send(result);
}
async function getDiscounts(req, res) {
  // pagination check & logic

  const result = await discountService.getDiscounts(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Discounts"),
    data: result,
  });
}
//
async function updateDiscount(req, res) {
  const result = await discountService.updateDiscount({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteDiscount(req, res) {
  const result = await discountService.deleteDiscount(req.params.id);
  res.send(result);
}
//
module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscounts,
};
