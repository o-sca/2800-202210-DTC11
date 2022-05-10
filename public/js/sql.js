const mysql = require('mysql');


const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect(err => {
    if (err) throw err;
    console.log('Connected')

    const createTableQuery = [
        'CREATE TABLE IF NOT EXISTS users',
        '(id INT AUTO_INCREMENT PRIMARY KEY,',
        'email VARCHAR(255),',
        'password VARCHAR(255),',
        'admin BOOL)'
    ].join(' ');

    con.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Table created!');
    });

    con.end(err => {
        if (err) throw err;
        console.log('database connection closed!');
        process.exit();
    });
});