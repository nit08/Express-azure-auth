var express = require("express");
var express = require("express");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
// var db = require('../db');
var router = express.Router();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    function verify(issuer, profile, cb) {
      return done(null, profile);
    }
  )
);
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/login/federated/google", passport.authenticate("google"));


module.exports = router;
