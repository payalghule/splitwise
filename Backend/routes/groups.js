const express = require("express");
const router = express.Router();
const db = require("../db.js");

// router.get("/getGroup", (req, res) => {
//   let sql = `CALL getGroupNames('${req.params.user_id}', NULL);`;
//   db.query(sql, (err, result) => {
//     if (err) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end("Error in Data");
//     }
//     console.log("result is:", result);
//     if (result && result.length > 0 && result[0][0]) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(result[0]));
//     }
//   });
// });

router.post("/creategroup", (req, res) => {
  console.log("inside Create groups");

  const groupName = req.body.groupName;
  let groupMembers = req.body.groupMembers;
  console.log(groupName, groupMembers);
  // let sql = `select distinct id,username,email from dbsplitwise.users`;
  // db.query(sql, (err, result) => {
  //   if (err) {
  //     res.writeHead(500, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end("Error in Data");
  //   }
  //   console.log("result is:", result);
  //   if (result && result.length) {
  //     res.writeHead(200, {
  //       "Content-Type": "text/plain",
  //     });
  //     res.end(JSON.stringify(result));
  //   }
  // });
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
    console.log("result is:", result);
    if (result && result.length) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(result));
    }
  });
});

module.exports = router;
