const mongoose = require("mongoose");
const { Schema } = mongoose;

let WebcodeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    taskname: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  {
    collection: "webcode",
    versionKey: false,
  }
);

let WebcodeModel = mongoose.model("webcode", WebcodeSchema);
module.exports = { WebcodeModel };
