const httpStatus = require("http-status");

function getUpdateResponse({ data, what }) {
  return {
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.update(what),
    data,
  };
}

function getDeletionResponse({ data, what }) {
  return {
    statusCode: data === null ? httpStatus[404] : 200,
    success: data === null ? false : true,
    message: data === null ? err_msg.id_not_found : success_msg.delete(what),
    data,
  };
}

function getErrorResponse(error) {
  if (error.code === 11000 || error.code === 11001) {
    // Duplicate key error
    return {
      statusCode: httpStatus[409],
      success: false,
      message: err_msg.conflict("Showroom"),
    };
  }
  // Other errors
  throw error;
}

const success_msg = {
  create: (what) => `${what} created successfully`,
  delete: (what) => `${what} deleted successfully`,
  update: (what) => `${what} updated successfully`,
  fetch: (what) => `${what} fetched successfully`,
};

const err_msg = {
  id_not_found: "id not found",
  invalid: "Invalid Request",
  bad_req: "Bad Request",
  not_found: (what) => `${what} not found`,
  server_error: "Internal Server Error",
  unauthorized: "Unauthorized Access",
  forbidden: "Forbidden Access",
  conflict: (what) => `${what} already exists`,
};

module.exports = {
  getUpdateResponse,
  getDeletionResponse,
  getErrorResponse,
  success_msg,
  err_msg,
};
