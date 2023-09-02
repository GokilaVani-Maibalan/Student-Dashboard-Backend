var express = require("express");
var router = express.Router();
const { CapSubModel } = require("../schemas/capsubSchema");

const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");

mongoose.connect(dbUrl);

router.post("/submit", async (req, res) => {
  try {
    let capsub = await CapSubModel.create(req.body);
    res.status(200).send({
      capsub,
      message: "Project Submit Successful",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
    console.log(error);
  }
});

router.get("/get/:name/:selectedTask", async function (req, res) {
  try {
    let capsub = await CapSubModel.find({
      name: req.params.name,
    }); // find({what you want},{what you don't want})
    res.status(200).send({
      capsub,
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
