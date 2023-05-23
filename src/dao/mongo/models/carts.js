import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
  {
    product: [
      {
        id: String,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const cartstModel = mongoose.model(collection, schema);

export default cartstModel;
