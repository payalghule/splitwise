var assert = require("chai").assert;
var app = require("./index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Splitwise", function () {
  describe("Login Test", function () {
    it("Incorrect Password", () => {
      agent
        .post("/login")
        .send({ email: "payalghule@gmail.com", password: "pay23" })
        .then(function (res) {
          expect(res.text).to.equal('{"errMsg":"INCORRECT_PASSWORD"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Invalid User", () => {
      agent
        .post("/login")
        .send({ email: "noemail@gmail.com", password: "pay23" })
        .then(function (res) {
          expect(res.text).to.equal('{"errMsg":"NO_USER"}');
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Successful Login", () => {
      agent
        .post("/login")
        .send({ email: "payalghule@gmail.com", password: "payal" })
        .then(function (res) {
          expect(res.status).to.equal(200);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

describe("User Signup Test", () => {
  it("User Exists", () => {
    agent
      .post("/signup")
      .send({
        username: "Payal",
        email: "payalghule@gmail.com",
        password: "payal",
      })
      .then(function (res) {
        expect(res.text).to.equal('{"errMsg":"EMAIL_EXIST"}');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Successful User Signup", () => {
    agent
      .post("/signup")
      .send({
        username: "Pratik",
        email: "pratik@gmail.com",
        password: "pratik",
      })
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
