const userService = require("../cervices/user.service");
const httpStatus = require("http-status");

async function createUser(req, res) {
  const result = await userService.createUser(req.body);
  res.send(result);
}
async function getUsers(req, res) {
  // pagination check & logic

  const result = await userService.getUsers(req.query);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
}
//
async function updateUser(req, res) {
  const result = await userService.updateUser({
    id: req.params.id,
    data: req.body,
  });
  res.send(result);
}
//
async function deleteUser(req, res) {
  const result = await userService.deleteUser(req.params.id);
  res.send(result);
}
//
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
