const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist/anne/")));

app.use(express.json());
app.use(cors());

// routes
const apiRoutes = require("./routes/api");

// mongoose
const mongoose = require("mongoose");
let mongoDB = process.env.MONGODB_URI || "mongodb://127.0.0.1/my_database";
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

app.get(
  ["/home", "/cv/", "/gallery", "/gallery/*", "/contact", "/login", "/admin"],
  (req, res) => {
    res.sendFile(path.join(__dirname, "dist/anne/index.html"));
  }
);

app.listen(process.env.PORT || 4201, () => {
  console.log("listening");
});
