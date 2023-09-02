const mongoose = require("mongoose");
const { Schema } = mongoose;

let WebSubSchema = new Schema(
  {
    frontendURL: { type: String, required: true },

    backendURL: {
      type: String,
      required: true,
    },
    frontendDeployedURL: { type: String, required: true },

    backendDeployedURL: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    selectedTask: { type: String, required: true },
  },

  {
    collection: "websub",
    versionKey: false,
  }
);

let WebSubModel = mongoose.model("websub", WebSubSchema);
module.exports = { WebSubModel };
