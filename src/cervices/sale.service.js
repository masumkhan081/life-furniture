const Sale = require("../models/sale.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createSale(data) {
  try {
    const addResult = await Sale.create(data);
    return getCreateResponse({ data: addResult, what: operableEntities.sale });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.sale });
  }
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
    return getUpdateResponse({ data: editResult, what: operableEntities.sale });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.sale });
  }
}
//
async function deleteSale(id) {
  try {
    const deleteResult = await Sale.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.sale,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.sale });
  }
}

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSales,
};
