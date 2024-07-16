const ProductCategory = require("../models/productCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");

async function createProductCategory(data) {
  try {
    const addResult = await ProductCategory.create(data);
    return getCreateResponse({ data: addResult, what:operableEntities.product_category });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.product_category  });
  }
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
    return getUpdateResponse({ data: editResult, what:operableEntities.product_category });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.product_category  });
  }
}
//
async function deleteProductCategory(id) {
  try {
    const deleteResult = await ProductCategory.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what:operableEntities.product_category,
    });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.product_category  });
  }
}

module.exports = {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategories,
};
