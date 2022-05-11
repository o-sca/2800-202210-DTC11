const mysql = require('mysql');


class SQL {
    async connect() {
        this.con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        try {
            await new Promise((resolve, reject) => {

                this.con.connect(err => {
                    return err? reject(err) : resolve(console.log(`Connected to database: ${this.con.config.database}`))
                })
            })
        } catch (err) {
            return console.log(err)
        }
    };

    end() {
        this.con.end(err => {
            if (err) throw err;
            console.log('Closed connection to database')
            // process.exit()
        })
    };

    createTable() {
        const createTableQuery = [
            'CREATE TABLE IF NOT EXISTS users',
            '(id INT AUTO_INCREMENT PRIMARY KEY,',
            'username CHAR(20),',
            'email VARCHAR(255),',
            'password VARCHAR(255),',
            'admin TINYINT(1))'
        ].join(' ');
    
        this.con.query(createTableQuery, (err, result) => {
            if (err) throw err;
            console.log('Table created!', result);
        });
    };

    async findUser(username) {
        try{
            return new Promise(async (resolve, reject) => {
                await this.connect();
                this.con.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
                    if (err) return reject(err);
                    return resolve(result.length > 0);
                })
                return this.end()
            })
        } catch (err) {
            return console.log(err)
        }
    };

    async addNewUser(username, email, password) {
        const insertQuery = `INSERT INTO users (username, email, password, admin) VALUES(?, ?, ?, ?)`;
        const insertValues = [username, email, password, 0];
        try {
            return new Promise(async (resolve, reject) => {
                await this.connect();
                this.con.query(insertQuery, insertValues, (err) => {
                    if (err) return reject(err);
                    return resolve('New user added to database');
                })
                return this.end();
            })
        } catch (err) {
            return console.log(err)
        }
    };

    async register(username, email, password) {
        let user = await this.findUser(username);
        if (!user) return `${username} have been taken`;
        let response = await this.addNewUser(username, email, password);
        return response;
    };
};


module.exports = SQL;