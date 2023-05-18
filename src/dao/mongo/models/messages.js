import mongoose from "mongoose";

const collection = "messages";

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    password: String,
    email: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const messagesModel = mongoose.model(collection, schema);

export default messagesModel;
