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
                console.log(`Connected to threadID: ${this.con.threadId}`)
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

  createUsersTable() {
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
  }

  createStationsTable() {
    const createTableQuery = [
      "CREATE TABLE IF NOT EXISTS stations",
      "(userID INT(11),",
      "stationID INT(11))",
    ].join(" ");

    this.con.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log("Table created!", result);
    });
  }

  async findUser(username) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.length > 0 ? result[0].id : false);
          }
        );
        return this.end();
      });
    } catch (err) {
      return console.log(err);
    }
  }

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
          return resolve(`${username} added to database`);
        });
        return this.end();
      });
    } catch (err) {
      console.log(err);
    }
  }

  async register(username, email, password) {
    let userExists = await this.findUser(username);
    if (!!userExists)
      return {
        success: false,
        id: "",
      };
    let response = await this.addNewUser(username, email, password);
    let userID = await this.findUser(username);
    console.log({ userID });
    await this.addUserIntoStation(userID);
    // TODO: handle insertion error
    return { success: true, id: userID };
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
            console.log(result);
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

  async addUserIntoStation(userID) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          `INSERT INTO stations (userID, stationID) VALUES (?, ?)`,
          [userID, 0],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.affectedRows >= 1 ? true : false);
          }
        );
        return this.end();
      });
    } catch (e) {
      return console.error(e);
    }
  }

  async insertStation(userID, stationID) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          `INSERT INTO stations (userID, stationID)
          SELECT * FROM (SELECT ?, ?) as tmp
          WHERE NOT EXISTS (SELECT userID FROM stations WHERE stationID = ?) LIMIT 1`,
          [userID, stationID, stationID],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.affectedRows >= 1 ? true : false);
          }
        );
        return this.end();
      });
    } catch (e) {
      return console.error(e);
    }
  }

  async removeStation(userID, stationID) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          `DELETE FROM stations WHERE userID = ? AND stationID = ?`,
          [userID, stationID],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.affectedRows >= 1 ? true : false);
          }
        );
        return this.end();
      });
    } catch (e) {
      return console.error(e);
    }
  }

  async fetchSavedStations(userID) {
    try {
      return new Promise(async (resolve, reject) => {
        await this.connect();
        this.con.query(
          `SELECT * FROM stations WHERE userID = ?`,
          [userID],
          (err, result) => {
            if (err) return reject(err);
            return resolve(result.length > 0 ? result : false);
          }
        );
        return this.end();
      });
    } catch (e) {
      return console.log(e);
    }
  }
}

module.exports = mysqlWrapper;
