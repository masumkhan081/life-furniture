const { defaultViewLimit } = require("../config/constants");

function getSearchAndPagination(query) {
  const { search, page, limit } = query;

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

  return {
    currentPage,
    searchTerm,
    viewLimit,
    viewSkip,
  };
}

module.exports = { getSearchAndPagination };
