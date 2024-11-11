const otpService = require('../service/otpService');
const Responses = require('../helper/response');
const messages = require('../constants/message');
const { validateOtpData } = require('../validator/otpvalidation');

// Handle Send OTP request

const handleSendOtp = async (req, res) => {
  try {
      const { email } = req.body; 

     
      const validationErrors = validateOtpData({ email });
      if (Object.keys(validationErrors).length > 0) {
          return Responses.failResponse(req, res, validationErrors, messages.validationError, 400);
      }

      const result = await otpService.sendOtp(email); 
      console.log(result);
      
      return Responses.successResponse(req, res, result, messages.otpSent, 200);
  } catch (error) {
      console.error(error);
      return Responses.errorResponse(req, res, {
          message: error.message || 'Failed to send OTP.',
      });
  }
};



const handleVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const validationErrors = validateOtpData({ email, otp });
    if (Object.keys(validationErrors).length > 0) {
      return Responses.failResponse(req, res, validationErrors, messages.validationError, 400);
    }

  
    const result = await otpService.verifyOtp(email, otp);
    return Responses.successResponse(req, res, result, messages.otpVerified, 200);
  } catch (error) {
    console.error('Error in OTP verify request:', error.message, error.stack);
    return Responses.errorResponse(req, res, {
      message: error.message || 'Failed to verify OTP.',
    });
  }
};

module.exports = {
  handleSendOtp,
  handleVerifyOtp,
};
