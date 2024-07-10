const productModel = require("../models/vendor.model");

async function createVendor(data) {
  const addResult = await productModel.create(data);
  return addResult;
}
//
async function getVendors({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await productModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await productModel.countDocuments({
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
async function updateVendor({ id, data }) {
  const editResult = await productModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteVendor(id) {
  const deleteResult = await productModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createVendor,
  updateVendor,
  deleteVendor,
  getVendors,
};
