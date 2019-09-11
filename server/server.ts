const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const fileRoutes = require("./routes/image-upload");
const apiRoutes = require("./routes/api")

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
