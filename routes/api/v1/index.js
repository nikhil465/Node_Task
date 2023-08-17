const express = require("express");
const router = express.Router();

router.use("/user", require("./users"));
router.use("/logs", require("./logs"));

module.exports = router;
