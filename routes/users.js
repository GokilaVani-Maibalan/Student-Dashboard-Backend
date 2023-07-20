var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const ResetToken = require("../schemas/resetTokenSchema");
const { User } = require("../schemas/userSchema");
const mongoose = require("mongoose");
const { dbUrl } = require("../common/dbConfig");
const nodemailer = require("nodemailer");

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
    let users = await User.find({}, { password: 0 }); // find({what you want},{what you don't want})
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
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      let hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;

      let user = await User.create(req.body);
      let token = await createToken({
        email: user.email,
        id: user._id,
        name: user.name,
      });
      res.status(200).send({
        message: "User Signup Successful",
        token,
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
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      // verify password
      if (hashCompare(req.body.password, user.password)) {
        //create token
        let token = await createToken({
          email: user.email,
          id: user._id,
          name: user.name,
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
    let user = await User.findOne({ _id: req.params.id }); // find data
    console.log(user);
    if (user) {
      // let user = await User.UpdateOne({_id:req.params.id},req.body); // updateOne doesnot check validation

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

// Endpoint for the "Forgot Password" request
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "levelup.learningplatform@gmail.com",
      pass: "maznatbykattexhj",
    },
  });
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a random token for password reset
    const token = crypto.randomBytes(20).toString("hex");
    console.log(token);
    // Create a new ResetToken document
    const resetToken = new ResetToken({
      user: user._id,
      token,
    });

    // Save the token to the database
    await resetToken.save();
    // Send the reset password email
    const mailOptions = {
      from: "levelup.learningplatform@gmail.com",
      to: email,
      subject: "Password Reset Request",
      text: `Hi ${user.name},

      Forgot your password?
      We received a request to reset the password for your account. 

      If you did not make this request then please ignore this email.

      Otherwise, click on the below link or paste it into your browser to complete the process: 
        http://localhost:3000/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
      }
    });

    res.json({ resetToken, message: "Password reset email sent." });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for "Reset Password"
router.post("/reset-password", async (req, res) => {
  const { password, token } = req.body;

  try {
    const resetToken = await ResetToken.findOne({ token });

    if (!resetToken) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token." });
    }

    // Find the user associated with the reset token
    const user = await User.findById(resetToken.user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's password
    user.password = password;

    // Save the updated user and remove the reset token
    await user.save();
    await resetToken.deleteOne();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error processing reset password request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
