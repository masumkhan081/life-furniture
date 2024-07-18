const Order = require("../models/order.model");
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

async function createOrder(data) {
  try {
    const addResult = await Order.create(data);
    return getCreateResponse({ data: addResult, what: operableEntities.order });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.order });
  }
}
//
async function getOrders(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.order});

  const fetchResult = await Order.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Order.countDocuments(filterConditions);
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
async function updateOrder({ id, data }) {
  try {
    const editResult = await Order.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.order,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.order });
  }
}
//
async function deleteOrder(id) {
  try {
    const deleteResult = await Order.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.order,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.order });
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};
