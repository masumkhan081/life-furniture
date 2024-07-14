const waiverModel = require("../models/waiver.model");

async function createWaiver(data) {
  const addResult = await waiverModel.create(data);
  return addResult;
}

async function getWaivers({
  currentPage,
  searchTerm,
  viewLimit,
  viewSkip,
  sortBy,
  sortOrder,
}) {
  const fetchResult = await waiverModel
    .find({
      title: { $regex: new RegExp(searchTerm, "i") },
    })
    .skip(viewSkip)
    .limit(viewLimit);

  const total = await waiverModel.countDocuments({
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

async function updateWaiver({ id, data }) {
  const updateResult = await waiverModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updateResult;
}

async function deleteWaiver(id) {
  const deleteResult = await waiverModel.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = { createWaiver, updateWaiver, deleteWaiver, getWaivers };
