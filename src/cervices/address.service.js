/* eslint-disable no-unused-vars */
const Address = require("../models/address.model");
const getSearchAndPagination = require("../utils/pagination");

async function createAddress(data) {
  // const addResult = await addressModel.create(data);

  const addBulkResult = await Address.insertMany(data);
  return addBulkResult;
}
//
async function getAddresses(query) {
  const { currentPage, viewLimit, viewSkip, filterConditions } =
    getSearchAndPagination(query);
  const { sortBy, sortOrder } = query;

  const fetchResult = await Address
    .find(filterConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Address.countDocuments(filterConditions);
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
  const editResult = await Address.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteAddress(id) {
  const deleteResult = await Address.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
