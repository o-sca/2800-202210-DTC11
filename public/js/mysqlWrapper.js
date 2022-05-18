const mysql = require("mysql2");
require("dotenv").config();
class mysqlWrapper {
  async connect() {
    const herokuConfig = {
      host: process.env.HEROKU_HOST,
      user: process.env.HEROKU_USER,
      password: process.env.HEROKU_PASSWORD,
      database: process.env.HEROKU_DATABASE,
      multipleStatements: false,
    };
    const localConfig = {
      host: process.env.LOCAL_HOST,
      user: process.env.LOCAL_USER,
      password: process.env.LOCAL_PASSWORD,
      database: process.env.LOCAL_DATABASE,
      multipleStatements: false,
    };
    this.con = process.env.IS_HEROKU
      ? mysql.createConnection(herokuConfig)
      : mysql.createConnection(localConfig);

    try {
      await new Promise((resolve, reject) => {
        this.con.connect((err) => {
          return err
            ? reject(err)
            : resolve(
                console.log(
                  `Connected to database: ${this.con.config.database}`
                )
              );
        });
      });
    } catch (err) {
      return console.log(err);
    }
  }

  end() {
    this.con.end((err) => {
      if (err) throw err;
      console.log("Closed connection to database");
      // process.exit()
    });
  }

  createTable() {
    const createTableQuery = [
      "CREATE TABLE IF NOT EXISTS users",
      "(id INT AUTO_INCREMENT PRIMARY KEY,",
      "username CHAR(20),",
      "email VARCHAR(255),",
      "password VARCHAR(255),",
      "admin TINYINT(1))",
    ].join(" ");

    this.con.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Table created!", result);
    });
  };

  async findUser(username) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.length > 0);
          }
        );
        return this.end();
      });
    } catch (err) {
      return console.log(err);
    }
  };

  async addNewUser(username, email, password) {
    let currentDateTime = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const insertQuery = `INSERT INTO users (username, email, password, added, admin) VALUES(?, ?, ?, ?, ?)`;
    const insertValues = [username, email, password, currentDateTime, 0];
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(insertQuery, insertValues, (err) => {
          if (err) return reject(err);
          return resolve(`New account for "${username}" has been created`);
        });
        console.log(this.end());
      });
    } catch (err) {
      console.log(err);
    }
  };

  async register(username, email, password) {
    let userExists = await this.findUser(username);
    if (userExists)
      return {
        success: false,
        message: `Username "${username}" has been taken`,
      };
    let response = await this.addNewUser(username, email, password);
    // TODO: handle insertion error
    return { success: true, message: response };
  }

  async authenticate(username, password) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          "SELECT * FROM users WHERE username = ? AND password = ? ",
          [username, password],
          (err, result) => {
            if (err) return reject(err);
            console.log(result)
            resolve({
              userID: result[0].id,
              isAuth: result.length > 0,
              isAdmin: result.length > 0 ? result[0].admin > 0 : false,
            });
          }
        );
        return this.end();
      });
    } catch (err) {
      return console.log(err);
    }
  }

  async getUsers(offset = 0, limit = 10) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          "SELECT * FROM users LIMIT ? , ?",
          [offset, limit],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        return this.end();
      });
    } catch (err) {
      return console.log(err);
    }
  }
}

module.exports = mysqlWrapper;