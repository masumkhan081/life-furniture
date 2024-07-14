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

  // page-number - pagination field
  const currentPage = page === "" ? 1 : page === undefined ? 1 : page;

  // limit - pagination field
  const viewLimit =
    limit === ""
      ? defaultViewLimit
      : limit === undefined
      ? defaultViewLimit
      : limit;

  // skip  - pagination field
  const viewSkip = viewLimit * (currentPage - 1);

  // what fild to be searched on
  const searchBy =
    search_by === undefined ? "whole" : search_by === "" ? "whole" : search_by;

  // what to be searched by
  const searchTerm =
    search === "" ? search : search === undefined ? "" : search;

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

    filterConditions[searchBy] = { $regex: new RegExp(searchTerm, "i") };
    // console.log(JSON.stringify(filterConditions) + searchTerm);
    
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

module.exports = getSearchAndPagination;
