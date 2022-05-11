//ClearDB: mysql://b56c870481272c:020fb15f@us-cdbr-east-05.cleardb.net/heroku_567fba5f05dd92f?reconnect=true

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b56c870481272c",
  password: "020fb15f",
  database: "heroku_567fba5f05dd92f",
});

con.connect((err) => {
  if (err) throw err;
  // Create table
  const createTableQuery = [
    "CREATE TABLE IF NOT EXISTS score",
    "(id INT AUTO_INCREMENT PRIMARY KEY,",
    "name VARCHAR(255),",
    "score INT)",
  ].join(" ");
  con.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
  // Insert data
  const insertQuery = "INSERT INTO score (name, score) VALUES('Peter', 50)";
  con.query(insertQuery, (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });
  // Retrieve data
  con.query("SELECT * FROM score limit 1", (err, result, fields) => {
    if (err) throw err;
    console.log(result[0]["name"]);
    console.log(result[0]["score"]);
  });
  con.end((err) => {
    if (err) throw err;
    console.log("Closed databased connection.");
    process.exit();
  });
});
