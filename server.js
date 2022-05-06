const express = require("express");
const app = express();
app.use(express.static("./public"));
const session = require("express-session");
app.use(
  session({
    secret: "I ain't tellin' nobody!",
    saveUninitialized: true,
    resave: true,
  })
);
app.set("view engine", "ejs");

const https = require("https");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

users = {
  user1: "123",
  user2: "456",
};

app.listen(5001, function (err) {
  if (err) console.log(err);
});

app.get("/", function (req, res) {
  if (req.session.authenticated) {
    res.sendFile(__dirname + "/public/main.html");
  } else {
    res.sendFile(__dirname + "/public/login.html");
  }
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

// use "/loginAttempt" to use AJAX request
app.post("/auth", function (req, res) {
  username = req.body.username;
  password = req.body.password;
  if (users[username] == password) {
    req.session.authenticated = true;
    req.session.user = req.params.user;
    res.redirect("/");
  } else {
    req.session.authenticated = false;
    res.send("Username or password incorrect.");
  }
});
