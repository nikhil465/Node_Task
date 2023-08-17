const express = require("express");
const router = express.Router();
const passport = require('passport');
const userController = require('../../../controllers/user_controller');

router.post("/create", passport.authenticate('jwt', {session: false}), userController.create);

module.exports = router;
