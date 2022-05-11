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
const url = require("url");

const https = require("https");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const req = require("express/lib/request");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

https.createServer((req, red) => {
  let q = url.parse(req.url, true);
  console.log(q.query);

  res.writeHead(200, {
    "Contet-Type": "test/html",
    "Access-Control-Allow-Origin": "*",
  });
});

const mysql = require("mysql");
// const con = mysql.createConnection({
//   host: "us-cdbr-east-05.cleardb.net",
//   user: "b56c870481272c",
//   password: "020fb15f",
//   database: "heroku_567fba5f05dd92f",
// });
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "l3br0y",
  database: "users",
});

con.connect((err) => {
  if (err) throw err;
});

app.listen(preocess.env.PORT | 5001, function (err) {
  if (err) console.log(err);
});

users = {
  user1: { password: "123", email: "user1@gmail.com" },
  user2: { password: "456", email: "user2@gmail.com" },
  user3: { password: "789", email: "user3@gmail.com" },
};

//------- ROUTES -------//

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

app.get("/logout", function (req, res) {
  req.session.authenticated = false;
  // diplay "logged out" via alert or temporary page
  res.redirect("/");
});

// use "/loginAttempt" to use AJAX request
app.post("/auth", function (req, res) {
  username = req.body.username;
  password = req.body.password;
  // username;
  console.log(username + " stores " + password);
  if (username == "admin" && password == "topsecret") {
    req.session.admin = true;
  } else if (username in users && users[username].password == password) {
    req.session.authenticated = true;
    req.session.admin = false;
    req.session.user = req.params.username;
    res.redirect("/");
  } else {
    req.session.authenticated = false;
    req.session.admin = false;
    res.send(`Password for ${req.session.user} is incorrect`);
  }
});

app.post("/admin", function (req, res) {
  if (req.session.admin) {
    res.send(user);
  } else {
    res.send("Unauthorized - access denied");
  }
});

app.post("/register", function (req, res) {
  username = req.body.username;
  password = req.body.password;
  email = req.body.email;
  if (username in users) {
    res.send("Username already exists");
  } else {
    console.log("update users");
  }
});
