const Stock = require("../models/stock.model");

async function createProduct(data) {
  const addResult = await Stock.create(data);
  return addResult;
}
//
async function getProducts({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Stock.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Stock.countDocuments({
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
async function updateProduct({ id, data }) {
  const editResult = await Stock.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteProduct(id) {
  const deleteResult = await Stock.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
