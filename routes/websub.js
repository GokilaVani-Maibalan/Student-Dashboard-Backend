var express = require("express");
var router = express.Router();
const { WebSubModel } = require("../schemas/websubSchema");

const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");

mongoose.connect(dbUrl);

router.post("/submit", async (req, res) => {
  try {
    let websub = await WebSubModel.create(req.body);
    res.status(200).send({
      websub,
      message: "Project Submit Successful",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.get("/get/:name/:selectedTask", async function (req, res) {
  try {
    let websub = await WebSubModel.find({
      name: req.params.name,
    }); // find({what you want},{what you don't want})
    res.status(200).send({
      websub,
      message: "Webcode Data Fetch Succesful!",
      res: console.log(websub),
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: console.log(error),
    });
  }
});
module.exports = router;
