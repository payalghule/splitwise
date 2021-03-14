const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const groups = require("./routes/groups");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/groups", groups);

const port = process.env.PORT || 3001;
let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
