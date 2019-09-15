const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());

// routes
const fileRoutes = require("./routes/image-upload");
const apiRoutes = require("./routes/api")

// mongoose
const mongoose = require('mongoose');
let mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET");
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
})

app.use("/image-upload", fileRoutes);

app.use("/api", apiRoutes);

app.listen(4201, "127.0.0.1", () => {
  console.log("listening");
});
