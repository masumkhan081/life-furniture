const { Schema, model } = require("mongoose");

 

export const orderSchema = new Schema(
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

    thumbnail: FileSchema,
    keywords: [String],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const orderModel = model("orders", orderSchema);

module.exports =  orderModel;
