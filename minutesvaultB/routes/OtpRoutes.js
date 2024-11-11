const express = require('express');
const router = express.Router();
const otpController = require('../controller/otpController');


router.post('/send-otp', otpController.handleSendOtp);
router.post('/verify-otp',otpController.handleVerifyOtp)

module.exports = router;
