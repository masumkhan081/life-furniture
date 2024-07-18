const showroomServices = require("../cervices/showroom.service");
const httpStatus = require("http-status");

async function createShowroom(req, res) {
  const result = await showroomServices.createShowroom(req.body);
  res.send(result);
}
async function getShowrooms(req, res) {
  const result = await showroomServices.getShowrooms(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Showrooms fetched successfully",
    data: result,
  });
}
async function updateShowroom(req, res) {
  const result = await showroomServices.updateShowroom({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
async function deleteShowroom(req, res) {
  const result = await showroomServices.deleteShowroom(req.params.id);
  res.send(result);
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
