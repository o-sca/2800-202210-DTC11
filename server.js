const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "I ain't tellin' nobody!",
    saveUninitialized: true,
    resave: true,
  })
);

const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const https = require("https");

const MySQLWrapper = require("./public/js/mysqlWrapper.js");
const mysqlWrapper = new MySQLWrapper();

app.listen(5001, function (err) {
  if (err) console.log(err);
  console.log("Listening");
});

/***** ROUTES *****/

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
  // TODO: diplay "logged out" via alert or temporary page
  res.redirect("/");
});

// use "/loginAttempt" to use AJAX request
app.post("/auth", async function (req, res) {
  username = req.body.username;
  password = req.body.password;
  authenticatedResult = await mysqlWrapper.authenticate(username, password);
  if (authenticatedResult.isAdmin) {
    req.session.admin = true;
  }
  if (authenticatedResult.isAuth) {
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

app.post("/register", async (req, res) => {
  const username = req.body.username,
    password = req.body.password,
    email = req.body.email;
  let response = await mysqlWrapper.register(username, email, password);
  return res.send(response);
});
