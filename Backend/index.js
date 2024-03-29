const app = require("./app");

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const groups = require("./routes/groups");
const expense = require("./routes/expense");
const dashboard = require("./routes/dashboard");
const settle = require("./routes/settle");
const activity = require("./routes/activity");
const images = require("./routes/images");
const uploads = require("./routes/uploads");

app.use("/login", login);
app.use("/signup", signup);
app.use("/profile", profile);
app.use("/groups", groups);
app.use("/expense", expense);
app.use("/dashboard", dashboard);
app.use("/settle", settle);
app.use("/activity", activity);
app.use("/images", images);
app.use("/uploads", uploads);

const port = process.env.PORT || 3001;
let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
