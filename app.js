var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sequelize = require("./config/database");
require("dotenv").config();
// Routes
const authRoutes = require("./routes/auth");
const nilaiRoutes = require("./routes/nilai");
const jadwalRoutes = require("./routes/jadwal");
const kehadiranRoutes = require("./routes/kehadiran");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api", nilaiRoutes);
app.use("/api", jadwalRoutes);
app.use("/api", kehadiranRoutes);

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

app.get("/", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.send(
    "Selamat datang di Aplikasi Pengelolaan data Siswa/Siswi by DEWI LARASATI"
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send the error response
  res.status(err.status || 500).send({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
