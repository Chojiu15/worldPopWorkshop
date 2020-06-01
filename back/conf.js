const mysql = require('mysql')
const connexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'subwoofer',
    database : 'work'
})

module.exports = connexion