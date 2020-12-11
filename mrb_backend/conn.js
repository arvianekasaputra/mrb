var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "arvian",
  password: "Password.1",
  database: "mr_booking",
  debug: true,
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;