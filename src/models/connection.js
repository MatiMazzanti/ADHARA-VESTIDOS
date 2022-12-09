const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'adhara_vestidos'
});

connection.connect((err) => err ? console.log(err) : console.log("Conexion Exitosa!"));

module.exports = connection;

