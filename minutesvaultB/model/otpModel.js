const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otpExpiry: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 5 * 60 * 1000),
  },
  attempts: {
    type: Number,
    default: 1,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  lastVerifiedAt: {  
    type: Date,
    default: null,  
  },
}, { timestamps: true });  

module.exports = mongoose.model('Otp', otpSchema);
