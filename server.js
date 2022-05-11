const SQL = require('./public/js/sql.js');
const https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const sql = new SQL();


app.use(
	session({
		secret: "I ain't tellin' nobody!",
		saveUninitialized: true,
		resave: true,
	})
);

app.use(express.static("./public"));

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.set("view engine", "ejs");

app.listen(5001, function (err) {
	if (err) console.log(err);
	console.log('Listening')
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

app.post("/register", async (req, res) => {
	const username = req.body.username,
		  password = req.body.password,
		  email = req.body.email;
	
	const user = await sql.findUser(username);
	if (user !== false) return res.send(username, 'have been taken');
	const response = await sql.addNewUser(username, email, password);
	console.log(response)
});