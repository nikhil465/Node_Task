const express = require("express");
const router = express.Router();
const passport = require("passport");
const logController = require("../../../controllers/log_controller");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  logController.logs
);

module.exports = router;
