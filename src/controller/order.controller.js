const orderService = require("../cervices/order.service");
const httpStatus = require("http-status");

async function createOrder(req, res) {
  const result = await orderService.createOrder(req.body);
  res.send(result);
}
async function getOrders(req, res) {
  // pagination check & logic

  const result = await orderService.getOrders(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Addresses fetched successfully",
    data: result,
  });
}
//
async function updateOrder(req, res) {
  const result = await orderService.updateOrder({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteOrder(req, res) {
  const result = await orderService.deleteOrder(req.params.id);
  res.send(result);
}
//
module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};
