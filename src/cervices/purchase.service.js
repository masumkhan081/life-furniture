const Purchase = require("../models/purchase.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");


async function createPurchase(data) {
  const addResult = await Purchase.create(data);
  return addResult;
}
//
async function getPurchases({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Purchase
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Purchase.countDocuments({
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
async function updatePurchase({ id, data }) {
  
   try {
    const editResult = await Purchase.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Purchase" });
  } catch (error) {
    return getErrorResponse(error);
  };
}
//
async function deletePurchase(id) {
  try {
    const deleteResult = await Purchase.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Purchase" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchases,
};
