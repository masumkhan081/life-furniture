const { Schema, model } = require("mongoose");
//  need some answers
const vendorSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profilePicture: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const vendorModel = model("vendors", vendorSchema);

module.exports = vendorModel;
