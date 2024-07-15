const Sale = require("../models/sale.model");

async function createSale(data) {
  const addResult = await Sale.create(data);
  return addResult;
}
//
async function getSales({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Sale.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Sale.countDocuments({
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
async function updateSale({ id, data }) {
  const editResult = await Sale.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteSale(id) {
  const deleteResult = await Sale.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createSale,
  updateSale,
  deleteSale,
  getSales,
};
