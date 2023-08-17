const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../../../controllers/user_controller");

router.get("/login", userController.login);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  userController.create
);

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  userController.update
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  userController.delete
);

router.get(
  "/getUserById/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getUserById
);
module.exports = router;
