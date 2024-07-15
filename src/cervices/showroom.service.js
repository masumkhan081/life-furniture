const Showroom = require("../models/showroom.model");

async function createShowroom(data) {
  const addResult = await Showroom.create(data);
  return addResult;
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
  const editResult = await Showroom.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteShowroom(id) {
  const deleteResult = await Showroom.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createShowroom,
  updateShowroom,
  deleteShowroom,
  getShowrooms,
};
