const dashboardService = require("../cervices/dashboard.service");
const httpStatus = require("http-status");

async function getOverviews(req, res) {
  const result = await dashboardService.getOverviews(req.body);
  res.send(result);
}
//
module.exports = {
  getOverviews,
};
