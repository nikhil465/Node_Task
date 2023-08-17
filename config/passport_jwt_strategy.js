const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");
const User = require("../models/user");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(options, function (jwtPayload, done) {
    User.findByPk(jwtPayload.id)
      .catch((err) => {
        console.log("Error in finding user: ", err);
        return;
      })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
  })
);

module.exports = passport;
