const mongoose = require("mongoose");
const { Schema } = mongoose;

let PortfolioSchema = new Schema(
  {
    gitHubURL: { type: String, required: true },
    portfolioURL: {
      type: String,
      required: true,
    },
    resumeURL: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  {
    collection: "portfolio",
    versionKey: false,
  }
);

let PortfolioModel = mongoose.model("portfolio", PortfolioSchema);
module.exports = { PortfolioModel };
