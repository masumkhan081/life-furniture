const { Schema, model } = require("mongoose");

export const FileSchema = new Schema({
  size: String,
  name: String,
  type: String,
  url: String,
  id: String,
});

export const waiverSchema = new Schema(
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

const waiverModel = model("waivers", waiverSchema);

module.exports = waiverModel;
