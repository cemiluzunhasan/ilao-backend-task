const express = require("express");
const app = express();

const segmentRoutes = require("./api/routes/segments");

app.use("/segments", segmentRoutes);

app.use((req, res, next) => {
  res.status(200).send({
    message: "It works"
  })
  next();
});

module.exports = app;