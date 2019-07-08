const express = require("express");
const app = express();

const riderRoutes = require("./api/routes/riders");

app.use("/riders", riderRoutes);

app.use((req, res, next) => {
  res.status(200).send({
    message: "It works"
  })
  next();
});

module.exports = app;