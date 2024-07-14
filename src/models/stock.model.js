const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const stockSchema = new Schema(
  {
    showroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "showrooms",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    note: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const productModel = model("stock", stockSchema);

module.exports = productModel;
