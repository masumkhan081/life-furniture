const Showroom = require("../models/showroom.model");

/* eslint-disable no-unused-vars */
const { getSearchAndPagination } = require("../utils/pagination");
const {
  success_msg,
  getErrorResponse,
  err_msg,
  getDeletionResponse,
  getUpdateResponse,
} = require("../utils/responseHandler");

async function createShowroom(data) {
  try {
    const addResult = await Showroom.create(data);
    return {
      statusCode: 201,
      success: true,
      msg: success_msg.create("Showroom"),
      data: addResult,
    };
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function getShowrooms({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await Showroom.find({
    title: { $regex: new RegExp(searchTerm, "i") },
  })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await Showroom.countDocuments({
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
async function updateShowroom({ id, data }) {
  try {
    const editResult = await Showroom.findByIdAndUpdate(id, data, {
      new: true,
    });
    return getUpdateResponse({ data: editResult, what: "Showroom" });
  } catch (error) {
    return getErrorResponse(error);
  }
}
//
async function deleteShowroom(id) {
  try {
    const deleteResult = await Showroom.findByIdAndDelete(id);
    return getDeletionResponse({ data: deleteResult, what: "Showroom" });
  } catch (error) {
    return getErrorResponse(error);
  }
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
