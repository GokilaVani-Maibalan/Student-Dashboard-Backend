const validator = require("validator");
const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: (value) => {
        // input value // by default validate has clback fn
        return validator.isEmail(value); // validator validates whether it is valid email
      },
    },
    password: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "User",
    versionKey: false,
  }
);

let User = mongoose.model("User", UserSchema);
module.exports = { User };
