const Purchase = require("../models/purchase.model");
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

async function createPurchase(data) {
  try {
    const addResult = await Purchase.create(data);
    return getCreateResponse({ data: addResult, what: "Purchase" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.purchase });
  }
}
//
async function getPurchases(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.purchase});

  const fetchResult = await Purchase.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Purchase.countDocuments(filterConditions);
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
    return getErrorResponse({ error, what: operableEntities.purchase });
  }
}
//
async function deletePurchase(id) {
  try {
    const deleteResult = await Purchase.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.purchase,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.purchase });
  }
}

module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchases,
};
