const saleService = require("../cervices/sale.service");
const httpStatus = require("http-status");

async function createSale(req, res) {
  const result = await saleService.create(req.body);
  res.send(result);
}
async function getSales(req, res) {
  const result = await saleService.getSales(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Sales fetched successfully",
    data: result,
  });
}
//
async function updateSale(req, res) {
  const result = await saleService.updateSale({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteSale(req, res) {
  const result = await saleService.deleteSale(req.params.id);
  res.send(result);
}
//
module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSales,
};
