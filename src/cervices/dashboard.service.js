/* eslint-disable no-unused-vars */
const Salary = require("../models/salary.model");
const Sale = require("../models/sale.model");
const SaleDetail = require("../models/saleDetail.model");
const Purchase = require("../models/purchase.model");
const PurchaseDetail = require("../models/purchaseDetail.model");
const Product = require("../models/product.model");
const ProductCategory = require("../models/productCategory.model");
const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");
const Expense = require("../models/expense.model");
const ExpenseDetail = require("../models/expenseDetail.model");

async function getOverviews(data) {
  const result = "result";
  return result;
}

module.exports = {
  getOverviews,
};
