const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/pg");
const morgan = require("morgan");
const env = require("./config/environment");
const passport = require("passport");
const passportJwt = require("./config/passport_jwt_strategy");

app.use(express.urlencoded({ extended: false }));

app.use(morgan(env.morgan.mode, env.morgan.options));

app.use(passport.initialize());

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server : ", err);
  }

  console.log("Server is up and running on port :", port);
});
