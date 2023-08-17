const express = require("express");
const router = express.Router();
const passport = require("passport");
const feedController = require("../../../controllers/feed_controller");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  feedController.create
);

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  feedController.update
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  feedController.delete
);

router.get(
  "/getFeedById/:id",
  passport.authenticate("jwt", { session: false }),
  feedController.getFeedById
);

router.post(
  "/access/:id",
  passport.authenticate("jwt", { session: false }),
  feedController.access
);

router.get(
  "/getAllFeeds",
  passport.authenticate("jwt", { session: false }),
  feedController.getAllFeeds
);
module.exports = router;
