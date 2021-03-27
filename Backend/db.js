const mysql = require("mysql");
const myPort = 3306;

const db = mysql.createPool({
  connectionLimit: 10,
  host: "database-ms1.cnqtrxygyjza.us-west-1.rds.amazonaws.com",
  port: myPort,
  user: "admin",
  password: "adminpayal",
  database: "dbsplitwise",
  multipleStatements: true,
});

db.getConnection((err) => {
  if (err) {
    throw "Error occured: " + err;
  }
});

// const db = mysql.createConnection({
//   host: "database-ms1.cnqtrxygyjza.us-west-1.rds.amazonaws.com",
//   port: myPort,
//   user: "admin",
//   password: "adminpayal",
//   database: "dbsplitwise",
//   //multipleStatements: true,
// });
// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = db;
