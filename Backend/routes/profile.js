const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/updateuser", (req, res) => {
  console.log("inside update");
  console.log("received Data from client", req.body);

  let sql = `CALL updateUser('${req.body.userid}','${req.body.email}','${req.body.username}','${req.body.phone}', '${req.body.currency}', '${req.body.timezone}','${req.body.language}');`;
  db.query(sql, (err, result) => {
    console.log("result is", result);
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    if (result && result.length > 0 && result[0][0].status === "USER_UPDATED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "NO_RECORD"
    ) {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.post("/getuserprofile", (req, res) => {
  console.log("inside getuserprofile groups");
  const userId = req.body.userId;
  console.log("req.body : ", req.body);
  let sql =
    "select id, username, email, phone, currency, timezone, language,user_image from dbsplitwise.users where id=?";
  console.log(sql);
  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result);
    if (result && result.length > 0) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});
module.exports = router;
