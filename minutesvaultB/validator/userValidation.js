const { body } = require('express-validator');

class DemoBookingValidator {
  static validateBooking() {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('mobile').isMobilePhone().withMessage('Invalid mobile number'),
      body('email').isEmail().withMessage('Invalid email address'),
      // body('message').notEmpty().withMessage('Message is required'),
    ];
  }
}

module.exports = DemoBookingValidator;
