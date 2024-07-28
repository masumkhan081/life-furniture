/* eslint-disable no-unused-vars */
const { operableEntities } = require("../config/constants");
const File = require("../models/file.model");
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createFile(data) {
  try {
    const addResult = await File.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.file,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}
//
async function getFiles(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.file });

  const fetchResult = await File.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await File.countDocuments(filterConditions);
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
async function updateFile({ id, data }) {
  try {
    const editResult = await File.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.file,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}
//
async function deleteFile(id) {
  try {
    const deleteResult = await File.findByIdAndDelete(id);
    return getDeletionResponse({
      data: deleteResult,
      what: operableEntities.file,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.file });
  }
}

module.exports = {
  createFile,
  updateFile,
  deleteFile,
  getFiles,
};
