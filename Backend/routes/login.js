const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const db = require("../db.js");

router.post("/", function (req, res) {
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

module.exports = router;
