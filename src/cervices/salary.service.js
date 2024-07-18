const Salary = require("../models/salary.model");
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

async function createSalary(data) {
  try {
    const addResult = await Salary.create(data);
    return getCreateResponse({ data: addResult, what: "Salary" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}
//
async function getSalaries(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.salary});

  const fetchResult = await Salary.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Salary.countDocuments(filterConditions);
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
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}
//
async function deleteSalary(id) {
  try {
    const deleteResult = await Salary.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Salary" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.salary });
  }
}

module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaries,
};
