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
app.use(bodyParser.json());
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
    res.sendFile(__dirname + "/public/main.html");
  } else {
    res.render("login", { username: "", message: "" });
  }
});

app.get("/logout", function (req, res, next) {
  req.session.authenticated = false;
  req.session.user = null;
  req.session.save(function (err) {
    if (err) next(err);
    req.session.regenerate(function (err) {
      if (err) next(err);
      res.redirect("/");
    });
  });
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const { userID, isAuth, isAdmin } = await mysqlWrapper.authenticate(
    username,
    password
  );
  req.session.authenticated = isAuth ? true : false;
  if (isAuth) {
    req.session.userID = userID;
    req.session.admin = isAdmin;
    req.session.username = username;
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
  const { success, userID } = await mysqlWrapper.register(
    username,
    email,
    password
  );
  if (success) {
    req.session.username = username;
    req.session.userID = userID;
    req.session.admin = false;
    res.redirect("/main.html");
  } else {
    res.render("newaccount", {
      email: email,
      message: "That username is already taken",
    });
  }
});

app.get("/deleteUser/:id", function (req, res) {
  const id = req.params.id;
  console.log({ id });
  const result = mysqlWrapper.deleteUser(id);
  res.send(result);
});

app.get("/userStatus", (req, res) => {
  res.send({
    isLoggedIn: req.session.authenticated,
    userID: req.session.userID,
    isAdmin: req.session.admin,
  });
});

app.get("/getUsers", async (req, res) => {
  const userList = await mysqlWrapper.getUsers(0, 20);
  res.send(userList);
});

app.get("/fetchSavedStations/:id", async (req, res) => {
  const result = await mysqlWrapper.fetchSavedStations(req.params.id);
  if (!result)
    return res.status(200).send({
      status: false,
      data: "No saved stations",
    });
  else
    res.status(200).send({
      status: true,
      data: result,
    });
});

app.post("/removeSavedStation", async (req, res) => {
  const result = await mysqlWrapper.removeStation(
    req.body.userID,
    req.body.stationID
  );
  if (result)
    return res.status(200).send({
      status: true,
      msg: "Successfully removed record",
    });
  else
    return res.status(200).send({
      status: false,
      msg: "Error removing record",
    });
});

app.post("/insertSavedStation", async (req, res) => {
  const result = await mysqlWrapper.insertStation(
    req.body.userID,
    req.body.stationID
  );
  if (result)
    return res.status(200).send({
      status: true,
      msg: "Successfully inserted new record",
    });
  else
    return res.status(200).send({
      status: false,
      msg: "Duplicate record found",
    });
});

