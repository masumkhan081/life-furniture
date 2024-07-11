/* eslint-disable no-unused-vars */
const addressModel = require("../models/address.model");
const { getSearchAndPagination } = require("../utils/pagination");

async function createAddress(data) {
  // const addResult = await addressModel.create(data);

  const addBulkResult = await addressModel.insertMany(data);
  return addBulkResult;
}
//
async function getAddresses(query) {
  const {
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
    filterConditions,
    sortConditions,
    searchConditions,
  } = getSearchAndPagination(query);
  const { sortBy, sortOrder } = query;

  // const fetchResult = await addressModel
  //   .find(filterConditions)
  //   .skip(viewSkip)
  //   .limit(viewLimit);

  const fetchResult = await addressModel.find({
    district: "Barguna",
    building: { $regex: new RegExp(searchTerm, "i") },
  });
  const total = await addressModel.countDocuments(filterConditions);
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
async function updateAddress({ id, data }) {
  const editResult = await addressModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteAddress(id) {
  const deleteResult = await addressModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
