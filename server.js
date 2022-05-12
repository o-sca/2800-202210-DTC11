const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const https = require("https");
const MySQLWrapper = require("./public/js/mysqlWrapper.js");
const mysqlWrapper = new MySQLWrapper();
const app = express();
app.use(express.static("./public"));

app.use(
  session({
    secret: "^!A*Wr9#v&ek5h6@Uo^a",
    admin: false,
    saveUninitialized: true,
    resave: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");

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

app.post("/auth", async function (req, res) {
  username = req.body.username;
  password = req.body.password;
  authResult = await mysqlWrapper.authenticate(username, password);
  console.log(authResult);
  req.session.authenticated = authResult.isAuth ? true : false;
  if (authResult.isAuth) {
    req.session.admin = authResult.isAdmin ? true : false;
    req.session.user = username;
    console.log(req.session);
    res.redirect("/");
    // res.sendFile(__dirname + "/public/main.html");
  } else {
    req.session.admin = false;
    res.send(`Password for ${req.session.user} is incorrect`);
  }
});

app.post("/admin", function (req, res) {
  if (req.session.admin) {
    res.sendFile(__dirname + "/public/admin.html");
  } else {
    res.send("Unauthorized access denied");
  }
});

app.post("/register", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  if (await mysqlWrapper.findUser(username)) {
    res.send("The username is already taken, please use another.");
  } else {
    const password = req.body.password;
    const email = req.body.email;
    let response = await mysqlWrapper.register(username, email, password);
    res.send(response);
  }
});
