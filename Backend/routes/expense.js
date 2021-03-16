const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/addexpense", (req, res) => {
  console.log("inside Add expense");
  const expenseDesc = req.body.description;
  const amount = req.body.amount;
  const groupName = req.body.groupName;
  const createdBy = req.body.createdBy;
  let sql =
    "INSERT INTO dbsplitwise.expense (expDesc, amount, groupName,paidBy) VALUES(?,?,?,?)";
  db.query(sql, [expenseDesc, amount, groupName, createdBy], (err, result) => {
    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
