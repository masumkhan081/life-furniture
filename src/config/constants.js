/* eslint-disable no-unused-vars */

const operableEntities = {
  address: "address",
  product: "product",
  customer: "customer",
  supplier: "supplier",
  product_category: "Product category",
  order: "order",
  purchase: "purchase",
  stock: "stock",
  discount: "discount",
  sale: "sale",
  sale_return: "Sale return",
  delivery: "delivery",
  salesman: "salesman",
  expense: "expense",
  expense_category: "Expense category",
  salary: "salary",
};

const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
const defaultViewLimit = 10;
const defaultSortOrder = "desc";

// may be changed based on the outcome expected
const defaultSortBy = {
  address: "address",
  product: "product",
  customer: "customer",
  supplier: "supplier",
  product_category: "product_category",
  order: "order",
  purchase: "purchase",
  stock: "stock",
  discount: "discount",
  sale: "sale",
  delivery: "delivery",
  salesman: "salesman",
  expense: "expense",
  expense_category: "expense_category",
  salary: "salary",
};

const address_searchables = [
  "district",
  "subdistrict",
  "village",
  "street",
  "building",
];

module.exports = {
  paginationFields,
  defaultViewLimit,
  address_searchables,
  defaultSortOrder,
  defaultSortBy,
  operableEntities,
};
