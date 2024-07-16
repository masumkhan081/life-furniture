const OrderDelivery = require("../models/delivery.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createOrderDelivery(data) {
  const addResult = await OrderDelivery.create(data);
  return addResult;
}
//
async function getOrderDeliveries({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await OrderDelivery.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await OrderDelivery.countDocuments({
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
async function updateOrderDelivery({ id, data }) {
  try {
    const editResult = await OrderDelivery.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Order delivery" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteOrderDelivery(id) {
  try {
    const deleteResult = await OrderDelivery.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Order delivery" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
