const Order = require("../models/order.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createOrder(data) {
  const addResult = await Order.create(data);
  return addResult;
}
//
async function getOrders({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Order.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Order.countDocuments({
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
async function updateOrder({ id, data }) {
  try {
    const editResult = await Order.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Order" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteOrder(id) {
  try {
    const deleteResult = await Order.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Order" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};
