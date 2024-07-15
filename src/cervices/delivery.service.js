const OrderDelivery = require("../models/delivery.model");

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
  const editResult = await OrderDelivery.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteOrderDelivery(id) {
  const deleteResult = await OrderDelivery.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createOrderDelivery,
  updateOrderDelivery,
  deleteOrderDelivery,
  getOrderDeliveries,
};
