const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/getactivity", (req, res) => {
  console.log("inside getactivity");

  console.log("req.body : ", req.body);
  let sql =
    "select expenseId, expDesc, amount, groupName, (select username  from  dbsplitwise.users where id=paidBy) as paidBy, isSettleEntry, (select username  from  dbsplitwise.users where id=paidTo) as paidTo, DATE_FORMAT(createdAt,'%d-%b-%Y') as date from dbsplitwise.expense order by createdAt desc;";
  console.log(sql);
  db.query(sql, (err, result) => {
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
