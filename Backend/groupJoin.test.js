var assert = require("chai").assert;
var app = require("./index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("User Joined group", function () {
  it("Join successful", () => {
    agent
      .post("/groups/joingroup")
      .send({
        groupName: "Rent",
        groupMember: 1,
      })
      .then(function (res) {
        expect(res.text).to.equal("JOINED_GROUP");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Group join failed", () => {
    agent
      .post("/groups/joingroup")
      .send({
        groupName: "GroupNo12",
        groupMember: 222,
      })
      .then(function (res) {
        expect(res.text).to.equal("NO_RECORD");
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
