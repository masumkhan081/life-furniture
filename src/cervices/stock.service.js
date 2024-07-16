const Stock = require("../models/stock.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createProduct(data) {
  const addResult = await Stock.create(data);
  return addResult;
}
//
async function getProducts({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Stock.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Stock.countDocuments({
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
async function updateProduct({ id, data }) {
  try {
    const editResult = await Stock.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Stock" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
// not applicable like this
async function deleteProduct(id) {
  try {
    const deleteResult = await Stock.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Stock" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
