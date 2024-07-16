const Discount = require("../models/discount.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createDiscount(data) {
  const addResult = await Discount.create(data);
  return addResult;
}

async function getDiscounts({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Discount.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Discount.countDocuments({
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

async function updateDiscount({ id, data }) {
  
  try {
    const editResult = await Discount.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Discount" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

async function deleteDiscount(id) {
  try {
    const deleteResult = await Discount.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Discount" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscounts,
};
