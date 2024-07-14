const showroomServices = require("../cervices/showroom.service");
const httpStatus = require("http-status");
const { getSearchAndPagination } = require("../utils/pagination");

async function createshowroom(req, res) {
  const result = await showroomServices.createshowroom(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showroom Created successfully",
    data: result,
  });
}
async function getshowrooms(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } =
    getSearchAndPagination(req.query);

  const result = await showroomServices.getshowrooms({
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
async function updateshowroom(req, res) {
  const result = await showroomServices.updateshowroom({
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
async function deleteshowroom(req, res) {
  const result = await showroomServices.deleteshowroom(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showroom deleted successfully",
    data: result,
  });
}

module.exports = { createshowroom, updateshowroom, deleteshowroom, getshowrooms };
