const mongoose = require("mongoose");
const { Schema } = mongoose;

let LeaveSchema = new Schema(
  {
    days: { type: Number, required: true },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    reason: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
  },

  {
    collection: "leave",
    versionKey: false,
  }
);

let LeaveModel = mongoose.model("leave", LeaveSchema);
module.exports = { LeaveModel };
