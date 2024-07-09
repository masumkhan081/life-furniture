const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

// export const FileSchema = new Schema({
//   size: String,
//   name: String,
//   type: String,
//   url: String,
//   id: String,
// });

const salesmenSchema = new Schema(
  {
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const Salesman = model("salesmen", salesmenSchema);

module.exports = Salesman;
