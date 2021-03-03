const express = require("express");
const mysql = require("mysql");
var app = express();
var cors = require("cors");
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
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log("Server Log:Sign Up data received", username, email, password);
  db.query(
    "INSERT INTO users (username, email, password) VALUES(?,?,?)",
    [username, email, password],
    (err, result) => {
      console.log("error in insert", err);
    }
  );
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end("Successful Sign in");
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Server Log:Log in data received from client", email, password);
  db.query(
    "SELECT * FROM users WHERE email =? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.log("error in select:", err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        console.log("Received DB result:", result);
        res.cookie("cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/",
        });
        req.session.user = result[0].username;
        console.log("req.session.user ", req.session.user);

        res.send(result);
      } else {
        console.log("No Data received from database for given user");
        res.send({ message: "Wrong email/password" });
      }
    }
  );
});

const server = app.listen(3001, function () {
  console.log("Server listening on port 3001");
});
