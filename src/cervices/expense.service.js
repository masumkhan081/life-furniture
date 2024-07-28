const Expense = require("../models/expense.model");
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
//
async function createExpense(data) {
  try {
    const addResult = await Expense.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.expense,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.expense });
  }
}
//
async function getExpenses(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.expense });

  const fetchResult = await Expense.find(filterConditions)
    .populate("category")
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Expense.countDocuments(filterConditions);
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
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.expense,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.expense });
  }
}
//
async function deleteExpense(id) {
  try {
    const deleteResult = await Expense.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.expense,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.expense });
  }
}

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
