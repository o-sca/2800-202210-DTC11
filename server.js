const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const https = require("https");
const { redirect } = require("express/lib/response");
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

const MySQLWrapper = require("./public/js/mysqlWrapper.js");
const mysqlWrapper = new MySQLWrapper();

app.listen(process.env.PORT || 5001, function (err) {
  if (err) console.log(err);
  console.log("Listening");
});

/***** ROUTES *****/

app.get("/", function (req, res) {
  if (req.session.authenticated) {
    console.log("'/'");
    res.sendFile(__dirname + "/public/main.html");
  } else {
    res.render("login", { username: "", message: "" });
  }
});

app.get("/logout", function (req, res) {
  req.session.authenticated = false;
  // TODO: diplay "logged out" via alert or temporary page
  res.redirect("/");
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const { userID, isAuth, isAdmin } = await mysqlWrapper.authenticate(
    username,
    password
  );
  req.session.authenticated = isAuth ? true : false;
  if (isAuth) {
    req.session.id = userID;
    req.session.admin = isAdmin;
    req.session.user = username;
    req.session.admin ? res.redirect("/admin") : res.redirect("/");
  } else {
    req.session.admin = false;
    res.render(__dirname + "/public/login.ejs", {
      username: username,
      message: "Username or password invalid.",
    });
  }
});

app.get("/admin", function (req, res) {
  if (req.session.admin) {
    res.render("admin", {});
  } else {
    res.send("Unauthorized access denied");
  }
});

app.get("/newaccount", function (req, res) {
  res.render("newaccount", {
    email: "",
    message: "",
  });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  const { success, message } = await mysqlWrapper.register(
    username,
    email,
    password
  );
  success
    ? res.redirect("/")
    : res.render("newaccount", {
        email: email,
        message: "That username is already taken",
      });
});

app.get("/userStatus", (req, res) => {
  res.send({
    isLoggedIn: req.session.authenticated,
    isAdmin: req.session.admin,
  });
});

app.get("/getUsers", async (req, res) => {
  const userList = await mysqlWrapper.getUsers(0, 20);
  res.send(userList);
});

app.get("/getUserID", async (req, res) => {
  res.send(req.session.id);
});