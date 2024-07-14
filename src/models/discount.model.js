const { Schema, model } = require("mongoose");

const waiverSchema = new Schema(
  {
    label: {
      type: Number,
      required: true,
    },
    waiverPercentage: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const waiverModel = model("waivers", waiverSchema);

module.exports = waiverModel;
