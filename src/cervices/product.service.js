const Product = require("../models/product.model");
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

async function createProduct(data) {
  try {
    const addResult = await Product.create(data);
    return getCreateResponse({ data: addResult, what: "Product" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.product });
  }
}
//
async function getProducts(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.product});

  const fetchResult = await Product.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Product.countDocuments(filterConditions);
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
  try {
    const editResult = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Product" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.product });
  }
}
//
async function deleteProduct(id) {
  try {
    const deleteResult = await Product.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Product" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.product });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
};
