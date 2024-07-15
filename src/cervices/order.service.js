const Order = require("../models/order.model");

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
  const fetchResult = await Order
    .find({
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
  const editResult = await Order.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteOrder(id) {
  const deleteResult = await Order.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
};
