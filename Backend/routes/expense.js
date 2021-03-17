const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/addexpense", async (req, res) => {
  console.log("inside Add expense");
  const expenseDesc = req.body.description;
  const amount = req.body.amount;
  const groupName = req.body.groupName;
  const paidBy = req.body.createdBy;
  const groupMembers = req.body.groupMembers;
  const groupStrength = groupMembers.length;
  console.log("count of grpMembers", groupStrength);
  console.log(
    "Data recieved from client to add expense : ",
    expenseDesc,
    amount,
    groupName,
    paidBy,
    groupMembers
  );
  //to insert in expense  table
  let insertExpenseSql =
    "INSERT INTO dbsplitwise.expense (expDesc, amount, groupName,paidBy) VALUES(?,?,?,?)";
  db.query(
    insertExpenseSql,
    [expenseDesc, amount, groupName, paidBy],
    (err, result) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end("Error in Data");
      }
      console.log("Query result is:", result);
      if (result) {
        res.status(200).send({ msg: "EXPENSE_ADDED" });
      }
    }
  );

  //to create multiple entries on Bal_summary table

  if (groupMembers.length > 0) {
    let insertBalSumSql =
      "INSERT INTO dbsplitwise.balanceSummary ( pendingAmt, groupName, payableTo, borrower) VALUES ?";
    splittedAmt = amount / groupMembers.length;
    console.log("splittedAmt :", splittedAmt);
    let values = [splittedAmt, groupName, paidBy];
    let newValues = [];
    for (let i = 0; i < groupMembers.length; i++) {
      if (groupMembers[i].groupMembers !== paidBy) {
        value = [...values, groupMembers[i].groupMembers];
        newValues.push(value);
      }
    }
    console.log("newValues is: ", newValues);
    db.query(insertBalSumSql, [newValues], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(" Number of records inserted: " + result.affectedRows);
      }
    });
  }
});
module.exports = router;
