import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("subscription", subscriptionSchema);
