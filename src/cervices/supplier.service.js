const Supplier = require("../models/supplier.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createSupplier(data) {
  const addResult = await Supplier.create(data);
  return addResult;
}
//
async function getSuppliers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Supplier.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Supplier.countDocuments({
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
async function updateSupplier({ id, data }) {
  try {
    const editResult = await Supplier.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Supplier" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteSupplier(id) {
  try {
    const deleteResult = await Supplier.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Supplier" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
};
