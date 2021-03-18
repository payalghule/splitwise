const express = require("express");
const router = express.Router();
const db = require("../db.js");

router.post("/creategroup", (req, res) => {
  console.log("inside Create groups");

  const groupName = req.body.groupName;
  const groupCreatedby = req.body.groupCreatedby;
  let groupMembers = req.body.groupMembers.join();
  console.log(groupName, groupMembers, groupCreatedby);
  let sql = `CALL insertGroupInLoop('${groupCreatedby}','${groupName}','${groupMembers}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error occured while creating group:", err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result[0][0].status);
    if (result && result.length > 0 && result[0][0].status === "GROUP_ADDED") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    } else if (
      result &&
      result.length > 0 &&
      result[0][0].status === "GROUP_EXISTS"
    ) {
      res.writeHead(401, {
        "Content-Type": "text/plain",
      });
      res.end(result[0][0].status);
    }
  });
});

router.get("/getUser", (req, res) => {
  console.log("inside get groups");
  let sql = `select distinct id,username,email from dbsplitwise.users`;
  db.query(sql, (err, result) => {
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

router.post("/getallgroups", (req, res) => {
  console.log("inside getallgroups groups");
  const groupMember = req.body.groupMember;
  console.log("req.body : ", req.body);
  let sql =
    "select distinct groupName, isAccepted from dbsplitwise.groups where groupMembers=?";
  console.log(sql);
  db.query(sql, [groupMember], (err, result) => {
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

router.post("/joingroup", (req, res) => {
  console.log("inside Join group proc");

  const groupName = req.body.groupName;
  const groupMember = req.body.groupMember;

  console.log(groupName, groupMember);
  let sql = `CALL updateGroupJoinStatus('${groupName}','${groupMember}')`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error occured while joining group:", err);
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Error in Data");
    }
    console.log("Query result is:", result[0][0].status);
    if (result && result.length > 0 && result[0][0].status === "JOINED_GROUP") {
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

router.post("/getgroupmembs", (req, res) => {
  console.log("inside getgroupmembs groups");
  const groupName = req.body.gName;
  console.log("req.body : ", req.body);
  let sql =
    "select groupMembers from dbsplitwise.groups where isAccepted='True'and groupName=?";
  console.log(sql);
  db.query(sql, [groupName], (err, result) => {
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

router.post("/getgrpexpense", (req, res) => {
  console.log("inside getgroupmembs groups");
  const groupName = req.body.gName;
  console.log("req.body : ", req.body);
  let sql =
    "select expDesc, paidBy, (select username  from  dbsplitwise.users where id=paidBy) as paidbyUser, amount, DATE_FORMAT(createdAt,'%d-%b-%Y') as date from dbsplitwise.expense where groupName= ? group by paidBy, expDesc,createdAt order by createdAt desc;";
  console.log(sql);
  db.query(sql, [groupName], (err, result) => {
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
