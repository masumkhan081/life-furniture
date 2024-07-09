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
    title: {
      type: String,
      required: true,
      unique: true,
    },
    ref_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "refname",
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    conclusion: {
      type: String,
      required: true,
    },
    keywords: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const productModel = model("products", productSchema);

module.exports = productModel;
