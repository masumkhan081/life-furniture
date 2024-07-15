const Salary = require("../models/salary.model");

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
  const editResult = await Salary.findByIdAndUpdate(id, data, {
    new: true,
  });
  return editResult;
}
//
async function deleteSalary(id) {
  const deleteResult = await Salary.findByIdAndDelete(id);
  return deleteResult;
}

module.exports = {
  createSalary,
  updateSalary,
  deleteSalary,
  getSalaries,
};
