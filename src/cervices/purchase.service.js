const Purchase = require("../models/purchase.model");

async function createPurchase(data) {
  const addResult = await Purchase.create(data);
  return addResult;
}
//
async function getPurchases({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Purchase
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Purchase.countDocuments({
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
async function updatePurchase({ id, data }) {
  const editResult = await Purchase.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deletePurchase(id) {
  const deleteResult = await Purchase.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createPurchase,
  updatePurchase,
  deletePurchase,
  getPurchases,
};
