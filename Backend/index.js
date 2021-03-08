const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);

const port = process.env.PORT || 3001;
let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
