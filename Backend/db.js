const mysql = require("mysql");
const myPort = 3306;

const db = mysql.createPool({
  connectionLimit: 100,
  host: "database-ms1.cnqtrxygyjza.us-west-1.rds.amazonaws.com",
  port: myPort,
  user: "admin",
  password: "adminpayal",
  database: "dbsplitwise",
});

db.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
});

module.exports = db;