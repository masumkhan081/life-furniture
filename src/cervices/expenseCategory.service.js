const ExpenseCategory = require("../models/ExpenseCategoryCategory.model");

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
  const editResult = await ExpenseCategory.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteExpenseCategory(id) {
  const deleteResult = await ExpenseCategory.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
};
