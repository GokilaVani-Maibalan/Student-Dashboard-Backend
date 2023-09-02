const { CapStoneModel } = require("../schemas/capstoneSchema");

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");
mongoose.connect(dbUrl);

router.post("/add", async (req, res) => {
  try {
    let capstone = await CapStoneModel.create(req.body);
    res.status(200).send({
      capstone,
      message: "Capstone register Successful",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
    console.log(error);
  }
});

router.get("/get/:name", async function (req, res) {
  try {
    let capstone = await CapStoneModel.find({ name: req.params.name }); // find({what you want},{what you don't want})
    res.status(200).send({
      capstone,
      message: "Capstone Data Fetch Succesful!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: console.log(error),
    });
  }
});
module.exports = router;
