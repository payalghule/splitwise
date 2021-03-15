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

module.exports = router;
