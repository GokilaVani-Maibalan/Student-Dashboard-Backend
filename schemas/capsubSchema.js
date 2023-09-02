const mongoose = require("mongoose");
const { Schema } = mongoose;

let CapSubSchema = new Schema(
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
    collection: "capsub",
    versionKey: false,
  }
);

let CapSubModel = mongoose.model("capsub", CapSubSchema);
module.exports = { CapSubModel };
