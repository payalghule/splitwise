const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/getdashdata", (req, res) => {
  console.log("inside getdashdata");
  const userid = req.body.userid;
  //console.log("Getting data for user: ", userid);

  findInPayableSql =
    "select borrower as uid,(select username  from  dbsplitwise.users where id=borrower) as borrower, pendingAmt from dbsplitwise.balanceSummary where payableTo=? ";
  findInBorrowersSql =
    "select payableTo as uid, (select username  from  dbsplitwise.users where id=payableTo) as payableTo, pendingAmt from dbsplitwise.balanceSummary where borrower=? ";
  //let youOwe = [];
  //let youAreOwed = [];
  let ObjFinalArray = { keyYouOwe: [], keyYouAreOwed: [] };
  //Payable query check

  db.query(findInPayableSql, [userid], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        console.log("Element from payable: ", result[i]);
        if (result[i].pendingAmt > 0) {
          // youAreOwed.push(result[i]);
          ObjFinalArray.keyYouAreOwed.push(result[i]);
        } else if (result[i].pendingAmt < 0) {
          //youOwe.push(result[i]);
          let temp = { payableTo: "", pendingAmt: 0 };
          temp.payableTo = result[i].borrower;
          temp.pendingAmt = Math.abs(result[i].pendingAmt);
          temp.uid = result[i].uid;
          ObjFinalArray.keyYouOwe.push(temp);
        }
      }
    }
  });

  db.query(findInBorrowersSql, [userid], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        console.log("Element from borrower: ", result[i]);
        if (result[i].pendingAmt > 0) {
          //youOwe.push(result[i]);
          ObjFinalArray.keyYouOwe.push(result[i]);
        } else if (result[i].pendingAmt < 0) {
          //youAreOwed.push(result[i]);
          let temp = { borrower: "", pendingAmt: 0 };
          temp.borrower = result[i].payableTo;
          temp.pendingAmt = Math.abs(result[i].pendingAmt);
          temp.uid = result[i].uid;
          ObjFinalArray.keyYouAreOwed.push(temp);
        }
      }
      setTimeout(() => {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(ObjFinalArray));
      }, 200);
    } else {
      setTimeout(() => {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(ObjFinalArray));
      }, 200);
    }
  });

  //   let ObjYouOwe = { YouOwe: youOwe };
  //   let ObjYouAreOwed = { YouAreOwed: youAreOwed };
  //   let ObjFinalArray = { ...ObjYouOwe, ...ObjYouAreOwed };
  //   console.log("youOwe array: ", JSON.stringify(ObjYouOwe));
  //   console.log("youAreOwed array: ", JSON.stringify(ObjYouAreOwed));
  //   console.log("Final array: ", JSON.stringify(ObjFinalArray));

  //Borrower query check
});

module.exports = router;
