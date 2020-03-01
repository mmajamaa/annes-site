const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

let config = { db_uri: "" };

if (process.env.NODE_ENV !== "production") {
  config = require("./config.json");
}

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    !req.secure &&
    req.get("x-forwarded-proto") !== "https" &&
    process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(express.static(path.join(__dirname, "dist/anne/")));

app.use(express.json());
app.use(cors());

// routes
const apiRoutes = require("./routes/api");

// mongoose
const mongoose = require("mongoose");
let mongoDB = process.env.MONGODB_URI || config.db_uri;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    console.log(err);
  }
);

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.text({ limit: "200mb" }));

app.use("/api", apiRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/anne/index.html"));
});

app.listen(process.env.PORT || 4201);
