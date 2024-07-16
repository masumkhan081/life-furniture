/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    detail: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const ExpenseCategory = model("expenseCategories", expenseCategorySchema);

module.exports = ExpenseCategory;
