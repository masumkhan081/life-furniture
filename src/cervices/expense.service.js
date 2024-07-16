const Expense = require("../models/expense.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createExpense(data) {
  const addResult = await Expense.create(data);
  return addResult;
}
//
async function getExpenses({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Expense.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Expense.countDocuments({
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
async function updateExpense({ id, data }) {
  try {
    const editResult = await Expense.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Expense" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteExpense(id) {
  try {
    const deleteResult = await Expense.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Expense" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
