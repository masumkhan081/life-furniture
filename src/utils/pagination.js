/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
const { defaultViewLimit } = require("../config/constants");

const address_searchables = [
  "district",
  "subdistrict",
  "village",
  "street",
  "building",
];

function getSearchAndPagination(query) {
  const { search, page, limit, search_by } = query;

  const currentPage = page === "" ? 1 : page === undefined ? 1 : page;
  const searchTerm =
    search === "" ? search : search === undefined ? "" : search;
  const viewLimit =
    limit === ""
      ? defaultViewLimit
      : limit === undefined
      ? defaultViewLimit
      : limit;
  const viewSkip = viewLimit * (currentPage - 1);

  const searchBy =
    search_by === undefined ? "whole" : search_by === "" ? "whole" : search_by;

  let searchConditions = [];
  let filterConditions = {};
  let sortConditions = {};
  let filterData;

  //
  if (searchBy === "whole") {
    for (let i = 0; i < address_searchables.length; i++) {
      searchConditions.push({
        [address_searchables[i]]: { $regex: new RegExp(searchTerm, "i") },
      });
    }
    filterConditions["$or"] = searchConditions;
    console.log("whole filter");
  } else {
    for (let i = 0; i < address_searchables.length; i++) {
      filterData = query[address_searchables[i]];
      if (filterData !== undefined && filterData !== "") {
        filterConditions[address_searchables[i]] = filterData;
      }
    }
    console.log(JSON.stringify(filterConditions));

    filterConditions[searchBy] = { $regex: new RegExp(searchTerm, "i") };
    console.log(JSON.stringify(filterConditions)+searchTerm);
  }

  return {
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
    filterConditions,
    sortConditions,
    searchConditions,
  };
}

module.exports =  getSearchAndPagination ;
