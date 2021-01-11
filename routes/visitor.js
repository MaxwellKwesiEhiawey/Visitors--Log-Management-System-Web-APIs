const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('../controllers/host');
const mongoose = require("mongoose");
const visitorController = require('../controllers/visitor');
const { body } = require('express-validator/check');
const Visitor = require('../models/visitor');
const router = express.Router();
const QRCode = require('qrcode');

// connect(process.env.MJ_APIKEY_PUBLIC,process.env.MJ_APIKEY_PRIVATE);
// const sendSMS = require("../send_sms");

router.post("/add", visitorController.addVisitor);





module.exports = router;
