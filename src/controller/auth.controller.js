const authService = require("../cervices/auth.service");
const httpStatus = require("http-status");
const config = require("../config");
const userModel = require("../models/user.model");

async function createUser(req, res) {
  const { username, email, password, phone } = req.body;

  const existence = await userModel.findOne({ username }).exec();

  if (existence) {
    res.send({
      statusCode: httpStatus.OK,
      success: true,
      message: "Username is already in use.",
      data: null,
    });
  }
  //   more validation to be added here or in mongoose schema
  else {
    const result = await authService.createUser({
      res,
      username,
      email,
      password,
      phone,
    });
    res.send({
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created successfully",
      data: result,
    });
  }
}

async function login(req, res) {
  // destructering the expected
  const { username, password } = req.body;
  authService.login({ res, username, password });
}

async function logout(req, res) {
  res.clearCookie(config.tokenHeaderKey);
  res.status(200).send("User logged out succesfully");
}

async function sendResetMail(req, res) {
  // destructuring the expected
  const { email } = req.body;
  const result = await authService.sendResetMail(email);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: result,
  });
}

async function resetPw(req, res) {
  const token = req.params.token;
  const result = await authService.resetPw(token);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: result,
  });
}

async function updatePw(req, res) {
  const result = await authService.updatePw(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the user password",
    data: result,
  });
}
async function sendOTPToEmail(req, res) {
  const { email } = req.body;

  const result = await authService.sendOTPToEmail(email);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "No Registered User With This Mail",
    data: result,
  });
}
async function validateEmail(req, res) {
  const { email, otp, token } = req.body;
  const result = await authService.validateEmail({ email, otp, token });

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

  const result = await authService.getProducts({
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
  const result = await authService.updateUser({
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
  const result = await authService.deleteUser(req.params.id);
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
