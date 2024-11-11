const mongoose = require('mongoose');

const demoBookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, 
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DemoBooking = mongoose.model('DemoBooking', demoBookingSchema);

module.exports = DemoBooking;
