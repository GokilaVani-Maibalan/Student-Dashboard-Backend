require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var cors = require("cors");

var usersRouter = require("./routes/users");
var portfolioRouter = require("./routes/portfolio");
var leaveRouter = require("./routes/leave");
var capStoneRouter = require("./routes/capstone");
var capSubRouter = require("./routes/capsub");
var webcodeRouter = require("./routes/webcode");
var webSubRouter = require("./routes/websub");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.use("/", usersRouter);

app.use("/users", usersRouter);
app.use("/portfolio", portfolioRouter);
app.use("/leave", leaveRouter);
app.use("/capstone", capStoneRouter);
app.use("/capsub", capSubRouter);
app.use("/webcode", webcodeRouter);
app.use("/websub", webSubRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  app.get("/reset-password/:token", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "reset-password.ejs"));
  });
  // Check if the environment is in development mode
  const showErrorDetails = app.get("env") === "development";

  res.status(500).render("error", {
    errorMessage: err.message,
    showErrorDetails,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = app;
