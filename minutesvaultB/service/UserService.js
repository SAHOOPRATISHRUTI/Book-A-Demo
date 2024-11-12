
const Booking = require('../model/userModel');  

class DemoBookingService {
  static async createBooking(data) {
    const newBooking = new Booking(data);
    return await newBooking.save(); 
  }
}

module.exports = DemoBookingService;
