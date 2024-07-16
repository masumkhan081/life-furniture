/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const Address = require("../models/address.model");
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
 

async function createAddress(data) {
  try {
    const addResult = await Address.create(data);
    return getCreateResponse({ data: addResult, what:operableEntities.address });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.address  });
  }
}
//
async function getAddresses(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination(query);

  const fetchResult = await Address.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Address.countDocuments(filterConditions);
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
async function updateAddress({ id, data }) {
  try {
    const editResult = await Address.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what:operableEntities.address });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.address  });
  }
}
//
async function deleteAddress(id) {
  try {
    const deleteResult = await Address.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what:operableEntities.address });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.address  });
  }
}

module.exports = {
  createAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
