const mongoose = require("mongoose");
const { Schema } = mongoose;

let CapStoneSchema = new Schema(
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
    collection: "capstone",
    versionKey: false,
  }
);

let CapStoneModel = mongoose.model("capstone", CapStoneSchema);
module.exports = { CapStoneModel };
