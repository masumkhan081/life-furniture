const Supplier = require("../models/supplier.model");

async function createSupplier(data) {
  const addResult = await Supplier.create(data);
  return addResult;
}
//
async function getSuppliers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Supplier.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Supplier.countDocuments({
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
async function updateSupplier({ id, data }) {
  const editResult = await Supplier.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteSupplier(id) {
  const deleteResult = await Supplier.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
};
