const Sale = require("../models/sale.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createSale(data) {
  const addResult = await Sale.create(data);
  return addResult;
}
//
async function getSales({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Sale.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Sale.countDocuments({
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
async function updateSale({ id, data }) {
  
   try {
    const editResult = await Sale.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Sale" });
  } catch (error) {
    return getErrorResponse(error);
  };
}
//
async function deleteSale(id) {
  try {
    const deleteResult = await Sale.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Sale" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSales,
};
