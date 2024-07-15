const Discount = require("../models/discount.model");

async function createDiscount(data) {
  const addResult = await Discount.create(data);
  return addResult;
}

async function getDiscounts({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Discount
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Discount.countDocuments({
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

async function updateDiscount({ id, data }) {
  const updateResult = await Discount.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateResult;
}

async function deleteDiscount(id) {
  const deleteResult = await Discount.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = { createDiscount, updateDiscount, deleteDiscount, getDiscounts };
