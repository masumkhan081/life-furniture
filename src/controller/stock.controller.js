const stockServices = require("../cervices/stock.service");
const httpStatus = require("http-status");

async function createStock(req, res) {
  const result = await stockServices.createStock(req.body);
  res.send(result);
}
async function getStocks(req, res) {
  const result = await stockServices.getStocks(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Stock fetched successfully",
    data: result,
  });
}
async function updateStock(req, res) {
  const result = await stockServices.updateStock({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
async function deleteStock(req, res) {
  const result = await stockServices.deleteStock(req.params.id);
  res.send(result);
}

module.exports = {
  createStock,
  updateStock,
  deleteStock,
  getStocks,
};
