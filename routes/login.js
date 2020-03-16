const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && user.password === password) {
    req.session.user = user;
    let userId = user._id;
    res.redirect("/");
  } else {
    res.send("Something is wrong...please, try again");
  }
});

router.post("/registration", async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  req.session.user = user;
  let userId = user._id;
  res.redirect("/");
});

router.get("/out", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

module.exports = router;
