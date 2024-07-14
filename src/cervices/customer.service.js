/* eslint-disable no-empty */
const customerModel = require("../models/customer.model");
const customerCreationSchema = require("../zod/customer.validate");
const Address = require("../models/address.model");

async function createCustomer(data) {
  let validOrNot;
  let response;
  try {
    validOrNot = customerCreationSchema.parse(data);

    console.log(typeof validOrNot.address);

    if (typeof validOrNot.address == "string") {
      console.log("if::1  ");
      response = await customerModel.create(data);
      console.log("if:  res: " + JSON.stringify(response));
    } else if (typeof validOrNot.address == "object") {
      console.log("else::1  ");
      const addressResult = await Address.create(validOrNot.address);
      console.log("else: res:" + JSON.stringify(addressResult));
      validOrNot.address = addressResult._id;
      response = await customerModel.create(validOrNot);
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
  const fetchResult = await customerModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await customerModel.countDocuments({
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
  const editResult = await customerModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteCustomer(id) {
  const deleteResult = await customerModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomers,
};
