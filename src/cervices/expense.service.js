const Expense = require("../models/expense.model");

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
  const editResult = await Expense.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteExpense(id) {
  const deleteResult = await Expense.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenses,
};
