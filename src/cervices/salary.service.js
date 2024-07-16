const Salary = require("../models/salary.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createSalary(data) {
  const addResult = await Salary.create(data);
  return addResult;
}
//
async function getSalaries({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Salary.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Salary.countDocuments({
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
async function updateSalary({ id, data }) {
  try {
    const editResult = await Salary.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Salary" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteSalary(id) {
  try {
    const deleteResult = await Salary.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Salary" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaries,
};
