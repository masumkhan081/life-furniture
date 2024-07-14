const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

//   const FileSchema = new Schema({
//   size: String,
//   name: String,
//   type: String,
//   url: String,
//   id: String,
// });

const productSchema = new Schema(
  {
    product_id: String,
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    images: [String],
    slugs: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Product = model("products", productSchema);

module.exports = Product;
