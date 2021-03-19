const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/settleup", (req, res) => {
  console.log("inside settleup groups");
  const settleWithUserId = req.body.settleWithUserId;
  const settlededById = req.body.settlededById;
  const settleUserAmt = req.body.settleUserAmt;
  console.log("settleWithUserId :", settleWithUserId);
  console.log("settlededById :", settlededById);
  console.log("settleUserAmt :", settleUserAmt);
  let sql =
    "update dbsplitwise.balanceSummary SET pendingAmt=0 where (payableTo=? or borrower=?) and (PayableTo=? or borrower=?)";
  //To get recent activity
  let insertExpSql =
    "INSERT INTO dbsplitwise.expense ( amount,paidBy,paidTo,isSettleEntry) VALUES(?,?,?,?)";
  console.log(sql);
  db.query(
    sql,
    [settleWithUserId, settleWithUserId, settlededById, settlededById],
    (err, result) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error in Data");
      }
      console.log("Query result is:", result);
      console.log(result.affectedRows + " record(s) updated");
      if (result.affectedRows) {
        res.status(200).send({ msg: "BAL_SETTLED" });
        //for recent activity-storing data
        db.query(
          insertExpSql,
          [settleUserAmt, settlededById, settleWithUserId, 1],
          (err, result) => {
            if (err) {
              console.log("Error while inserting data to expenses settlement");
            }
            console.log("Query result is:", result);
            console.log(result.affectedRows + " record(s) inserted");
          }
        );
      }
    }
  );
});
module.exports = router;
