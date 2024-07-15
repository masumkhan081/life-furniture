const showroomServices = require("../cervices/showroom.service");
const httpStatus = require("http-status");
const { getSearchAndPagination } = require("../utils/pagination");

async function createShowroom(req, res) {
  const result = await showroomServices.createShowroom(req.body);
  res.send({
    statusCode: result.success === true ? httpStatus.OK : httpStatus[409],
    success: result.success,
    message: result.msg,
    data: result.data,
  });
}
async function getShowrooms(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } =
    getSearchAndPagination(req.query);

  const result = await showroomServices.getShowrooms({
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
async function updateShowroom(req, res) {
  const result = await showroomServices.updateShowroom({
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
async function deleteShowroom(req, res) {
  const result = await showroomServices.deleteShowroom(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "showroom deleted successfully",
    data: result,
  });
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
