const userService = require("../services/vendor.service");
const httpStatus = require("http-status");

async function createUser(req, res) {
  const result = await userService.createProduct(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully",
    data: result,
  });
}

async function login(req, res) {
  // destructuring the expected
  const { email, username, phone, password } = req.body;
  const result = await userService.login({ email, username, phone, password });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
}

async function logout(req, res) {
  res.send(req.user);
}

async function sendResetMail(req, res) {
  // destructuring the expected
  const { email } = req.body;
  const result = await userService.sendResetMail(email);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: result,
  });
}

async function resetPw(req, res) {
  const token = req.params.token;
  const result = await userService.resetPw(token);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: result,
  });
}

async function updatePw(req, res) {
  const result = await userService.updatePw(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the user password",
    data: result,
  });
}
async function sendOTPToEmail(req, res) {
  const { email } = req.body;

  const result = await userService.sendOTPToEmail(email);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "No Registered User With This Mail",
    data: result,
  });
}
async function validateEmail(req, res) {
  const { email, otp, token } = req.body;
  const result = await userService.validateEmail({ email, otp, token });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
}

async function getUsers(req, res) {
  // pagination check & logic
  const { currentPage, searchTerm, viewLimit, viewSkip } = req.query;

  const result = await userService.getProducts({
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
}
//
async function updateUser(req, res) {
  const result = await userService.updateUser({
    id: req.params.id,
    data: req.body,
  });
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
}
//
async function deleteUser(req, res) {
  const result = await userService.deleteUser(req.params.id);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
}
//
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  login,
  logout,
  resetPw,
  updatePw,
  sendOTPToEmail,
  sendResetMail,
  validateEmail,
};
