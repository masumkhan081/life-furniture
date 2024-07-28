const brandService = require("../cervices/brand.service");
const httpStatus = require("http-status");

async function createBrand(req, res) {
  const result = await brandService.createBrand(req.body);
  res.send(result);
}
async function getBrandes(req, res) {
  const result = await brandService.getBrandes(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Brandes fetched successfully",
    data: result,
  });
}
//
async function updateBrand(req, res) {
  const result = await brandService.updateBrand({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteBrand(req, res) {
  const result = await brandService.deleteBrand(req.params.id);
  res.send(result);
}
//
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandes,
};
