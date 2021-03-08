const express = require("express");
const mysql = require("mysql");
var app = express();
var cors = require("cors");
const passwordHash = require("password-hash");
//var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

//app.use(bodyParser.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const db = mysql.createConnection({
  host: "database-ms1.cnqtrxygyjza.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "adminpayal",
  database: "dbsplitwise",
});

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   db.end();
// });

app.post("/SignUp", function (req, res) {
  const hashedPassword = passwordHash.generate(req.body.password);
  const username = req.body.username;
  const email = req.body.email;

  console.log(
    "Server Log:Sign Up data received",
    username,
    email,
    req.body.password
  );
  db.query(
    "SELECT COUNT(*) AS count FROM users WHERE email = ? ",
    email,
    (err, resData) => {
      if (err) {
        console.log(err);
      } else {
        if (resData[0].count > 0) {
          res.status(401).send({ errMsg: "EMAIL_EXIST" });
        } else {
          db.query(
            "INSERT INTO users (username, email, password) VALUES(?,?,?)",
            [username, email, hashedPassword],
            (err, result) => {
              if (err) {
                res.status(401).send({ errMsg: "INSERT_ERROR" });
              }
              console.log("Db result after insert:", result, result.insertId);
              //  if (result) {
              res.status(200).send({
                sucMsg: "USER_ADDED",
                username: username,
                email: email,
                phone: "None",
                userid: result.insertId,
              });
              // }
            }
          );
        }
      }
    }
  );
});

app.post("/login", function (req, res) {
  console.log("req.body");
  const email = req.body.email;
  const password = req.body.password;
  console.log("Server Log:Log in data received from client", email, password);
  db.query("SELECT * FROM users WHERE email =?", [email], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.send("Database Error");
    }
    if (result && result.length > 0) {
      if (passwordHash.verify(req.body.password, result[0].password)) {
        console.log("Received DB result:", result);
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = result[0].username;
        let userObject = {
          userid: result[0].id,
          username: result[0].username,
          email: result[0].email,
          phone: result[0].phone,
          language: result[0].language,
          timezone: result[0].timezone,
          currency: result[0].currency,
        };
        console.log("userObject ", userObject);
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(userObject));
      } else {
        res.status(401).send({ errMsg: "INCORRECT_PASSWORD" });
      }
    } else {
      console.log("No Data received from database for given user");
      res.status(401).send({ errMsg: "NO_USER" });
    }
  });
});

const server = app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
