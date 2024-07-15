function getErrorResponse(error) {
  if (error.code === 11000 || error.code === 11001) {
    // Duplicate key error
    return {
      success: false,
      msg: err_msg.conflict("Showroom"),
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
  invalid: "Invalid Request",
  bad_req: "Bad Request",
  not_found: (what) => `${what} not found`,
  server_error: "Internal Server Error",
  unauthorized: "Unauthorized Access",
  forbidden: "Forbidden Access",
  conflict: (what) => `${what} already exists`,
};

module.exports = {
  getErrorResponse,
  success_msg,
  err_msg,
};
