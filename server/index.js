const path = require("path");
const express = require("express");
const app = express();

const passport = require("passport");
const passportSetup = require("./src/config/passport_setup");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const keys = require("./src/config/keys");
require("dotenv").config();
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// set up session cookies
app.use(
  cookieSession({
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./src/routes/index"));
//app.use(require("./src/seeds/index"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
