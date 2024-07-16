const ExpenseCategory = require("../models/ExpenseCategoryCategory.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createExpenseCategory(data) {
  const addResult = await ExpenseCategory.create(data);
  return addResult;
}
//
async function getExpenseCategories({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await ExpenseCategory.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await ExpenseCategory.countDocuments({
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
async function updateExpenseCategory({ id, data }) {
  try {
    const editResult = await ExpenseCategory.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Expense category" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteExpenseCategory(id) {
  try {
    const deleteResult = await ExpenseCategory.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: "Expense category",
    });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
