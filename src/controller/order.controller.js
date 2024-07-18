const orderService = require("../cervices/order.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createOrder(req, res) {
  const result = await orderService.createOrder(req.body);
  res.send(result);
}
async function getOrders(req, res) {
  const result = await orderService.getOrders(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Order deliveries"),
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
