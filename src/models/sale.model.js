const { Schema, model } = require("mongoose");
// const mongoose = require("mongoose");

const saleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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

const saleModel = model("sales", saleSchema);

module.exports = saleModel;
