const express = require("express");
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");

const https = require("https");

app.listen(5000, function (err) {
  if (err) console.log(err);
});
