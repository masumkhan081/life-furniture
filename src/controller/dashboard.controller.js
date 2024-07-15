const dashboardService = require("../cervices/dashboard.service");
const httpStatus = require("http-status");

async function getOverviews(req, res) {
  const result = await dashboardService.getOverviews(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Address created successfully",
    data: result,
  });
}
//
module.exports = {
  getOverviews,
};
