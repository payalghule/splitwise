const express = require("express");
const router = express.Router();
const passwordHash = require("password-hash");
const db = require("../db.js");

router.post("/", function (req, res) {
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

module.exports = router;
