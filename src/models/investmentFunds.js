import { Schema, model } from "mongoose";

const investmentFundSchema = new Schema(
  {
    nameInvestmentFund: {
      type: String,
      required: true,
    },
    investment: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("investmentFund", investmentFundSchema);
