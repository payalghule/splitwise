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
      "INSERT INTO dbsplitwise.balanceSummary ( pendingAmt, groupName, payableTo, borrower) VALUES (?,?,?,?)";
    let memExistSql =
      "select pendingAmt from dbsplitwise.balanceSummary where borrower=? and payableTo=?";
    let updateAmtSql =
      "update dbsplitwise.balanceSummary set pendingAmt=? where borrower=? and payableTo=?";
    splittedAmt = amount / groupMembers.length;
    console.log("splittedAmt :", splittedAmt);
    for (let i = 0; i < groupMembers.length; i++) {
      if (groupMembers[i].groupMembers !== paidBy) {
        db.query(
          memExistSql,
          [groupMembers[i].groupMembers, paidBy],
          (err, result) => {
            if (err) {
              console.log(err);
            } else if (result.length === 0) {
              //make insert
              db.query(
                insertBalSumSql,
                [splittedAmt, groupName, paidBy, groupMembers[i].groupMembers],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("New entry added.");
                    console.log(
                      "Number of records inserted: " + result.affectedRows
                    );
                  }
                }
              );
            } else {
              //update entry
              newAmount = splittedAmt + result[0].pendingAmt;
              db.query(
                updateAmtSql,
                [newAmount, groupMembers[i].groupMembers, paidBy],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("Amount updated.");
                  }
                }
              );
            }
          }
        );
      }
    }
  }
});
module.exports = router;
