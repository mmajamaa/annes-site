const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

let config = "";

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

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use("/api", apiRoutes);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/anne/index.html"));
});

app.listen(process.env.PORT || 4201);
