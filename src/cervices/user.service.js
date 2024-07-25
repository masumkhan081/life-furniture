const User = require("../models/user.model");
/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const config = require("../config/index");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getCreateResponse,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");
const { operableEntities } = require("../config/constants");
const bcrypt = require("bcrypt");

async function createUser(data) {
  try {
    const salt = await bcrypt.genSalt(); // 10 is the number of salt rounds
    // Hash the password with the salt
    data.password = await bcrypt.hash(data.password, salt);
    const addResult = await User.create(data);
    return getCreateResponse({
      data: addResult,
      what: operableEntities.user,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.user });
  }
}

//
async function getUsers(query) {
  const {
    currentPage,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  } = getSearchAndPagination({ query, what: operableEntities.supplier });

  const fetchResult = await User.find(filterConditions)
    .sort(sortConditions)
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await User.countDocuments(filterConditions);
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
async function updateUser({ id, data }) {
  try {
    const editResult = await User.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({
      data: editResult,
      what: operableEntities.supplier,
    });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.supplier });
  }
}
//
async function deleteUser(id) {
  try {
    const deleteResult = await User.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "User" });
  } catch (error) {
    return getErrorResponse({ error, what: operableEntities.supplier });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
};
