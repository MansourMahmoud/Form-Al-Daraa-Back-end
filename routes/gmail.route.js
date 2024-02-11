const express = require("express");
const { sendGmail } = require("../controllers/gmail/sendGmail.controllers");
const router = express.Router();

router.route("/send").post(sendGmail);

module.exports = router;
