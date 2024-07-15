const Salesman = require("../models/salesman.model");

async function createSalesman(data) {
  const addResult = await Salesman.create(data);
  return addResult;
}
//
async function getSalesmen({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Salesman.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Salesman.countDocuments({
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
async function updateSalesmen({ id, data }) {
  const editResult = await Salesman.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteSalesmen(id) {
  const deleteResult = await Salesman.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createSalesman,
  updateSalesmen,
  deleteSalesmen,
  getSalesmen,
};
