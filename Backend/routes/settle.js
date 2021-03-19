const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/settleup", (req, res) => {
  console.log("inside settleup groups");
  const settleWithUserId = req.body.settleWithUserId;
  const settlededById = req.body.settlededById;
  console.log("settleWithUserId :", settleWithUserId);
  console.log("settlededById :", settlededById);
  let sql =
    "update dbsplitwise.balanceSummary SET pendingAmt=0 where (payableTo=? or borrower=?) and (PayableTo=? or borrower=?)";
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
      }
    }
  );
});
module.exports = router;
