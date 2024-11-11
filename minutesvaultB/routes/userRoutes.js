const express = require('express');
const demoBookingController = require('../controller/userController');
const DemoBookingValidator = require('../validator/userValidation');
const router = express.Router();


router.post(
  '/create',
  DemoBookingValidator.validateBooking(),
  demoBookingController.createBooking
);

module.exports = router;
