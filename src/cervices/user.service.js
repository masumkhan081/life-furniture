/* eslint-disable no-unused-vars */
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const mailService = require("../utils/mail");
const config = require("../config");
const httpStatus = require("http-status");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createUser({ res, username, email, phone, password }) {
  // already registered or not

  const hash = await bcrypt.hash(password, 10);
  const user = await new userModel({
    username,
    email,
    password: hash,
    phone,
  }).save();

  // -------- for current project, we don't need this portion
  // user
  //   ? mailService.sendOTPMail({
  //       user,
  //       res,
  //       successMessage: "An OTP has been sent to your email for verification.",
  //     })
  //   : res.status(400).send("Error creating account");
}
//
async function getUsers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await userModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await userModel.countDocuments({
    title: { $regex: new RegExp(searchTerm, "i") },
  });

  return {
    meta: {
      total,
      limit: viewLimit,
      page: currentPage,
      skip: viewSkip,
      sortBy,
      sortOrder,
    },
    data: fetchResult,
  };
}
//
async function updateUser({ id, data }) {
  try {
    const editResult = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "User" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.user });
  }
}
//
async function deleteUser(id) {
  try {
    const deleteResult = await userModel.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "User" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.user });
  }
}

async function login({ res, username, password }) {
  // registered or not
  const user = await userModel.findOne({ username });

  if (user) {
    // email and associated password matched and verified
    const bool = await bcrypt.compare(password, user.password);

    if (bool) {
      if (user.isVerified) {
        res
          .status(200)
          .cookie(
            config.tkn_header_key,
            JSON.stringify({
              id: user.id,
            }),
            {
              expire: 360000 + Date.now(),
            }
          )
          .send({
            nextPage: true,
            message: "You are logged in",
            email: user.email,
            phone: user.phone,
            fullName: user.fullName,
          });
      }
      // doesn't go with out current project
      // email and associated password matched but email not-verified yet
      else {
        mailService.sendOTPMail({
          user,
          res,
          successMessage:
            "Account not verified yet. We sent an OTP to your email for verification.",
        });
      }
    } else {
      res.status(400).send({ nextPage: false, message: "Wrong Credentials" });
    }
  }
  // no user with that email in system
  else {
    res.status(400).send({ nextPage: false, message: "Wrong Credentials" });
  }
}

async function logout(req, res) {
  res.clearCookie(config.tkn_header_key);
  res.status(200).send("Dick Pulled Out Succesfully");
}

async function sendResetMail(req, res) {
  // destructuring the expected
  const { email } = req.body;
  // const result = await mailService.sendResetMail(email);

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: "result",
  });
}

async function resetPw(req, res) {
  const token = req.params.token;
  // const result = await userService.resetPw(token);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully sent the reset mail to user email",
    data: "result",
  });
}

async function updatePw(req, res) {
  // const result = await userService.updatePw(req.body);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated the user password",
    data: "result",
  });
}
async function sendOTPToEmail(req, res) {
  // const { email } = req.body;

  // const result = await userService.sendOTPToEmail(email);
  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "No Registered User With This Mail",
    data: "result",
  });
}
async function validateEmail(req, res) {
  // const { email, otp, token } = req.body;
  // const result = await userService.validateEmail({ email, otp, token });

  res.send({
    statusCode: httpStatus.OK,
    success: true,
    message: "Products fetched successfully",
    data: "result",
  });
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  login,
  sendOTPToEmail,
  sendResetMail,
  validateEmail,
  logout,
  resetPw,
  updatePw,
};
