/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */

const {
  defaultViewLimit,
  address_searchables,
} = require("../config/constants");

function getSearchAndPagination(query) {
  const { search, page, limit, search_by, sort_by, sort_order } = query;

  // sorting data with a particular field and order or by taking prefined defaults in this regard
  const sortBy = sort_by || "createdAt";
  const sortOrder = sort_order || "desc";

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
  let sortConditions = { [sortBy]: sortOrder };
  let filterData;

  for (let i = 0; i < address_searchables.length; i++) {
    filterData = query[address_searchables[i]];
    if (filterData !== undefined && filterData !== "") {
      filterConditions[address_searchables[i]] = filterData;
    } else {
      searchConditions.push({
        [address_searchables[i]]: { $regex: new RegExp(searchTerm, "i") },
      });
    }
  }
  filterConditions["$or"] = searchConditions;

  console.log(JSON.stringify(filterConditions));

  return {
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
    sortBy,
    sortOrder,
    filterConditions,
    sortConditions,
  };
}

module.exports = { getSearchAndPagination };
