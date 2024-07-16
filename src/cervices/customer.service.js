/* eslint-disable no-empty */
const Customer = require("../models/customer.model");
const customerCreationSchema = require("../validation/customer.validate");
const Address = require("../models/address.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createCustomer(data) {
  let validOrNot;
  let response;
  try {
    validOrNot = customerCreationSchema.parse(data);

    console.log(typeof validOrNot.address);

    if (typeof validOrNot.address == "string") {
      console.log("if::1  ");
      response = await Customer.create(data);
      console.log("if:  res: " + JSON.stringify(response));
    } else if (typeof validOrNot.address == "object") {
      console.log("else::1  ");
      const addressResult = await Address.create(validOrNot.address);
      console.log("else: res:" + JSON.stringify(addressResult));
      validOrNot.address = addressResult._id;
      response = await Customer.create(validOrNot);
      console.log("else: res-2:" + JSON.stringify(response));
    }

    return response;
    // console.log(JSON.stringify(validOrNot));
  } catch (error) {
    console.error("Validation failed for new customer:", error.message);
    return "Validation failed";
  }
}
//
async function getCustomers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Customer.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Customer.countDocuments({
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
async function updateCustomer({ id, data }) {
  try {
    const editResult = await Customer.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Customer" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteCustomer(id) {
  try {
    const deleteResult = await Customer.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Customer" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
