const { z } = require("zod");

// Define a Zod schema for address validation
const addressSchema = z.object({
  district: z.string().min(1).max(50), // Optional because it's not marked as required in Mongoose
  sub_district: z.string().min(1).max(50), // Optional because it's not marked as required in Mongoose
  village: z.string().min(1).max(50).optional(), // Optional because it's not marked as required in Mongoose
  street: z.string().min(1).max(100).optional(), // Optional because it's not marked as required in Mongoose
  building: z.string().min(1).max(100).optional(), // Optional because it's not marked as required in Mongoose
});

module.exports = addressSchema;
