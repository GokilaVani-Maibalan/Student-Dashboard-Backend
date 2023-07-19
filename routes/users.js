var express = require("express");
var router = express.Router();
const { UserModel } = require("../schemas/userSchema");
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");
const {
  hashPassword,
  hashCompare,
  createToken,
  validate,
} = require("../common/auth");

mongoose.connect(dbUrl);

/* GET users listing. */

router.get("/", validate, async function (req, res, next) {
  try {
    let users = await UserModel.find({}, { password: 0 }); // find({what you want},{what you don't want})
    res.status(200).send({
      users,
      message: "Users Data Fetch Succesful!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      let user = await UserModel.create(req.body);
      res.status(200).send({
        message: "User Signup Successful",
      });
    } else {
      res.status(400).send({ message: "User Already Exists!" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      // verify password
      if (hashCompare(req.body.password, user.password)) {
        //create token
        let token = await createToken({
          email: user.email,
          id: user._id,
        });
        res.status(200).send({
          message: "User Login Successful",
          token,
        });
      } else {
        res.status(402).send({ message: "Invalid Credentials" });
      }
    } else {
      res.status(400).send({ message: "User Doesnot Exists!" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id }); // find data
    console.log(user);
    if (user) {
      // let user = await UserModel.UpdateOne({_id:req.params.id},req.body); // updateOne doesnot check validation

      user.name = req.body.name;
      user.email = req.body.email;
      user.password = req.body.password;

      await user.save();

      res.status(200).send({
        message: "User Updated Successful!",
      });
    } else {
      res.status(400).send({ message: "User Doesnot Exists!" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
