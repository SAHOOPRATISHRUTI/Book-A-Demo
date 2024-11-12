const DemoBookingService = require('../service/UserService');  
const { validationResult } = require('express-validator');
const { sendEmail } = require('../service/emailService');  
const Responses = require('../helper/response');  
const messages = require('../constants/message');  

class DemoBookingController {
  async createBooking(req, res) {
    const { name, mobile, email, message, address, preferredDate } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Responses.failResponse(req, res, errors.array(), messages.validationError, 400);
    }

    try {
      const newBooking = await DemoBookingService.createBooking({
        name,
        mobile,
        email,
        message,
        address,
        preferredDate,
      });

      const emailSubject = 'New Demo Booking Created';
      const mailData = `<p>A new booking has been made with the following details:</p>
                        <p>Name: ${newBooking.name}</p>
                        <p>Email: ${newBooking.email}</p>
                        <p>Mobile: ${newBooking.mobile}</p>
                        <p>Message: ${newBooking.message}</p>`;

      const adminEmail = 'pratishrutisahoo7@gmail.com';
      await sendEmail(adminEmail, emailSubject, mailData);

      return Responses.successResponse(req, res, newBooking, messages.bookingCreated, 200);
    } catch (error) {
      console.error('Error in creating booking:', error);
      return Responses.errorResponse(req, res, { message: error.message }, 500);
    }
  }
}

module.exports = new DemoBookingController();

