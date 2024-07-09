const shopModel = require("../models/shop.model");

async function createShop(data) {
  const addResult = await shopModel.create(data);
  return addResult;
}

async function getShops({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await shopModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await shopModel.countDocuments({
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
async function updateShop({ id, data }) {
  const editResult = await shopModel.findByIdAndUpdate(id, data, { new: true });
  return editResult;
}
async function deleteShop(id) {
  const deleteResult = await shopModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createShop,
  updateShop,
  deleteShop,
  getShops,
};
