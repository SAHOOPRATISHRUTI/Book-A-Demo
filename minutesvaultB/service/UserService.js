
const Booking = require('../model/userModel');  

class DemoBookingService {
  static async isMobileUsed(mobile) {
    const existingBooking = await Booking.findOne({ mobile });
    return existingBooking != null; 
  }

  static async isEmailUsed(email) {
    const existingBooking = await Booking.findOne({ email });
    return existingBooking != null;  
  }

  static async createBooking(data) {
    const newBooking = new Booking(data);
    return await newBooking.save(); 
  }
}

module.exports = DemoBookingService;
