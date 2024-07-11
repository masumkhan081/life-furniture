/* eslint-disable no-unused-vars */
const addressModel = require("../models/address.model");
const  getSearchAndPagination  = require("../utils/pagination");

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


  console.log("bug test ");
  const fetchResult1 = await addressModel
    .find(filterConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const fl2 = {
    district: "Barguna",
    building: { $regex: new RegExp(searchTerm, "i") },
  };

  const fetchResult2 = await addressModel
    .find(fl2)
    .skip(viewSkip)
    .limit(viewLimit);

  console.log(
    // JSON.stringify(fl2) + "  :: << >>   :: " + JSON.stringify(filterConditions)
  );

  const total = await addressModel.countDocuments(fl2);
  return {
    meta: {
      total,
      limit: viewLimit,
      page: currentPage,
      skip: viewSkip,
      sortBy,
      sortOrder,
    },
    data1: fetchResult1,
    data2: fetchResult2,
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
