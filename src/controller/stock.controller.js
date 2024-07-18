const stockServices = require("../cervices/stock.service");
const httpStatus = require("http-status");
const { getSearchAndPagination } = require("../utils/pagination");

async function createStock(req, res) {
  const result = await stockServices.createStock(req.body);
  res.send(result);
}
async function getStocks(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } =
    getSearchAndPagination(req.query);

  const result = await stockServices.getStocks({
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showrooms fetched successfully",
    data: result,
  });
}
async function updateStock(req, res) {
  const result = await stockServices.updateStock({
    id: req.params.id,
    data: req.body,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showroom updated successfully",
    data: result,
  });
}
async function deleteStock(req, res) {
  const result = await stockServices.deleteStock(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showroom deleted successfully",
    data: result,
  });
}

module.exports = {
  createStock,
  updateStock,
  deleteStock,
  getStocks,
};
