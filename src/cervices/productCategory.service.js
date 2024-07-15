const ProductCategory = require("../models/productCategory.model");

async function createProductCategory(data) {
  const addResult = await ProductCategory.create(data);
  return addResult;
}
//
async function getProductCategories({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await ProductCategory.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await ProductCategory.countDocuments({
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
async function updateProductCategory({ id, data }) {
  const editResult = await ProductCategory.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteProductCategory(id) {
  const deleteResult = await ProductCategory.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategories,
};
