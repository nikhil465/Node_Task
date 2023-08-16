const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(new JWTStrategy(options, function (jwtPayload, done) {}));

module.exports = passport;
