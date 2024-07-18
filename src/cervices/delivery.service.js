const OrderDelivery = require("../models/delivery.model");
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

async function createOrderDelivery(data) {
  try {
    const addResult = await OrderDelivery.create(data);
    return getCreateResponse({ data: addResult, what: "Order delivery" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.delivery });
  }
}
//
async function getOrderDeliveries(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.delivery });

  const fetchResult = await OrderDelivery.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await OrderDelivery.countDocuments(filterConditions);
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
async function updateOrderDelivery({ id, data }) {
  try {
    const editResult = await OrderDelivery.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.delivery,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.delivery });
  }
}
//
async function deleteOrderDelivery(id) {
  try {
    const deleteResult = await OrderDelivery.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.delivery,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.delivery });
  }
}

module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
