/* eslint-disable no-unused-vars */
const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const expenseDetailSchema = new Schema({
  label: String,
  amount: Number,
});

const expenseSchema = new Schema(
  {
    showroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "showrooms",
      required: true,
    },
    title: {
      type: Number,
      required: true,
    },
    expense_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "salesmen",
      // required: true,
    },
    details: [expenseDetailSchema],
    total_amount: Number,
    paid_amount: Number,
    remaining_amount: Number,
    note: String,
    expense_date: { type: Date, required: true, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Expense = model("expenses", expenseSchema);

module.exports = Expense;
