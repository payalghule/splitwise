var assert = require("chai").assert;
var app = require("./index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Group Create Test", function () {
  it("Group Created", () => {
    agent
      .post("/groups/creategroup")
      .send({
        groupName: "GroupNo12",
        groupCreatedby: 1,
        groupMembers: [1, 2],
      })
      .then(function (res) {
        expect(res.text).to.equal("GROUP_ADDED");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Group Name Exists", () => {
    agent
      .post("/groups/creategroup")
      .send({
        groupName: "GroupNo12",
        groupCreatedby: 1,
        groupMembers: [1, 2],
      })
      .then(function (res) {
        expect(res.text).to.equal("GROUP_EXISTS");
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
