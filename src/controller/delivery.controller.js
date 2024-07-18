const deliveryService = require("../cervices/delivery.service");
const httpStatus = require("http-status");
const { success_msg } = require("../utils/responseHandler");

async function createOrderDelivery(req, res) {
  const result = await deliveryService.createOrderDelivery(req.body);
  res.send(result);
}
async function getOrderDeliveries(req, res) {
  const result = await deliveryService.getOrderDeliveries(req.query);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: success_msg.fetch("Order deliveries"),
    data: result,
  });
}
//
async function updateOrderDelivery(req, res) {
  const result = await deliveryService.updateOrderDelivery({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteOrderDelivery(req, res) {
  const result = await deliveryService.deleteOrderDelivery(req.params.id);
  res.send(result);
}
//
module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
