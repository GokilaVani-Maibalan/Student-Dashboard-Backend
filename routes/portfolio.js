var express = require("express");
var router = express.Router();
const { PortfolioModel } = require("../schemas/portfolioSchema");
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");

mongoose.connect(dbUrl);

router.get("/get/:name", async function (req, res) {
  try {
    let portfolio = await PortfolioModel.findOne({ name: req.params.name });
    // console.log(portfolio);
    res.status(200).send({
      portfolio,
      message: "portfolio Data Fetch Succesful!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    let portfolio = await PortfolioModel.create(req.body);
    res.status(200).send({
      portfolio,
      message: "portfolio register Successful",
    });
  } catch (error) {
    console.log("Leave Erroe", error);
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
