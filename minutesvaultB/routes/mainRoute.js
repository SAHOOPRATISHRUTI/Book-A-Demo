const express = require('express');
const router = express.Router();


const otpRoutes = require('./OtpRoutes');
const userRoutes = require('./userRoutes');

router.use('/otp', otpRoutes);


router.use('/user', userRoutes);

module.exports = router;
