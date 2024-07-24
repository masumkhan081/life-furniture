const { operableEntities } = require("../config/constants");
const Employee = require("../models/employee.model");
const { getSearchAndPagination } = require("../utils/pagination");
const {
  getUpdateResponse,
  getDeletionResponse,
  getErrorResponse,
  getCreateResponse,
} = require("../utils/responseHandler");

async function createEmployee(data) {
  try {
    const addResult = await Employee.create(data);

    return getCreateResponse({
      data: addResult,
      what: operableEntities.employee,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.employee });
  }
}
//
async function getEmployees(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.employee });

  const fetchResult = await Employee.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Employee.countDocuments(filterConditions);
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
async function updateEmployee({ id, data }) {
  try {
    const editResult = await Employee.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.employee,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.employee });
  }
}
//
async function deleteEmployee(id) {
  try {
    const deleteResult = await Employee.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.employee,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.employee });
  }
}

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
};
