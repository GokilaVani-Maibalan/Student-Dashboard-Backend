var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");
const { LeaveModel } = require("../schemas/leaveSchema");

mongoose.connect(dbUrl);

router.get("/get/:name", async function (req, res) {
  console.log("leave model started..");
  console.log(LeaveModel);
  try {
    let leave = await LeaveModel.find({ name: req.params.name });
    res.status(200).send({
      leave,
      message: "Leave Data Fetch Succesful!",
    });
  } catch (error) {
    console.log("Leave Erroe", error);
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    let leave = await LeaveModel.create(req.body);
    res.status(200).send({
      leave,
      message: "Leave register Successful",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
