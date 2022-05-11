const mysql = require('mysql');


class SQL {
    initConnection() {
        this.con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });

        this.con.connect(err => {
            if (err) throw err;
            console.log('Connected to database:', this.con.config.database)
        })
    };

    end() {
        this.con.end(err => {
            if (err) throw err;
            console.log('database connection closed!');
            process.exit();
        });
    };

    createTable() {
        const createTableQuery = [
            'CREATE TABLE IF NOT EXISTS users',
            '(id INT AUTO_INCREMENT PRIMARY KEY,',
            'username CHAR(20),',
            'email VARCHAR(255),',
            'password VARCHAR(255))'
        ].join(' ');
    
        this.con.query(createTableQuery, (err, result) => {
            if (err) throw err;
            console.log('Table created!', result);
        });
    };

    readUsers() {
        this.con.query('SELECT * FROM users', (err, result, fields) => {
            if (err) throw err;
            console.log(result)
            console.log(fields)
        })
    };

    addNewUser(username, email, password) {
        const insertQuery = `INSERT INTO users (username, email, password) VALUES('${username}', '${email}', '${password}')`;
        this.con.query(insertQuery, (err, result) => {
            if (err) throw err;
            console.log('User added')
        })
    };
};


module.exports = SQL;