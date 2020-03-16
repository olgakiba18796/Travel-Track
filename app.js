const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const FileStore = require("session-file-store")(session);
require("dotenv").config();
// const auctionRouter = require("./routes/auction");
// const accountRouter = require("./routes/account");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  session({
    secret: "qwertyuiop",
    store: new FileStore({}),
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.json());
app.use(express.static("public"));
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use((req, res, next) => {
  const { user } = req.session;

  if (user) {
    app.locals.userId = user._id;

    return next();
  }
  return res.redirect("/login");
});
app.use("/", indexRouter);

// app.use("/account", accountRouter);
// app.use("/auction", auctionRouter);
app.locals.urlGoogle = process.env.REACT_APP_GOOGLE_MAP_URI;
function main() {
  try {
    mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => {
      console.log("Server has been started...");
    });
  } catch (e) {
    console.log(e);
  }
}
main();
