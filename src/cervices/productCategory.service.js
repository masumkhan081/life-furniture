const ProductCategory = require("../models/productCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

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
 
   try {
    const editResult = await ProductCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Product category" });
  } catch (error) {
    return getErrorResponse(error);
  };
}
//
async function deleteProductCategory(id) {
  try {
    const deleteResult = await ProductCategory.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Product category" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategories,
};
