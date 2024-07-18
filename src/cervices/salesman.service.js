const { operableEntities } = require("../config/constants");
const Salesman = require("../models/salesman.model");
const { getSearchAndPagination } = require("../utils/pagination");
const {
  getUpdateResponse,
  getDeletionResponse,
  getErrorResponse,
  getCreateResponse,
} = require("../utils/responseHandler");

async function createSalesman(data) {
  try {
    const addResult = await Salesman.create(data);

    return getCreateResponse({ data: addResult, what:operableEntities.salesman });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.salesman  });
  }
}
//
async function getSalesmen(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({query,what:operableEntities.salesman});

  const fetchResult = await Salesman.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Salesman.countDocuments(filterConditions);
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
async function updateSalesmen({ id, data }) {
  try {
    const editResult = await Salesman.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what:operableEntities.salesman });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.salesman  });
  }
}
//
async function deleteSalesmen(id) {
  try {
    const deleteResult = await Salesman.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what:operableEntities.salesman });
  } catch (error) {
    return getErrorResponse({error,what:operableEntities.salesman  });
  }
}

module.exports = {
  createSalesman,
  updateSalesmen,
  deleteSalesmen,
  getSalesmen,
};
