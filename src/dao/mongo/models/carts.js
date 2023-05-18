import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    password: String,
    email: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const cartstModel = mongoose.model(collection, schema);

export default cartstModel;
