const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const salesmenSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    full_name: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: { type: String, required: false },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
      required: true,
    },
    salary: { type: Number, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Salesman = model("salesmen", salesmenSchema);

module.exports = Salesman;
