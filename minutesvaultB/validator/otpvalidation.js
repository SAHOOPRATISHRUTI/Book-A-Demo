// otpvalidation.js (or wherever you keep validation logic)
const validateOtpData = (data, isVerification = false) => {
    const errors = {};
  
    // Email validation (required for both send and verify OTP)
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Valid email is required';
    }
  
    // Validation for 'name' and 'mobile' only for send OTP
    if (!isVerification) {
      if (!data.name) {
        errors.name = 'Name is required';
      }
  
      if (!data.mobile) {
        errors.mobile = 'Mobile number is required';
      } else if (!/^\d{10}$/.test(data.mobile)) {
        errors.mobile = 'Mobile number must be exactly 10 digits';
      }
    }
  
    // OTP validation (only for verification)
    if (isVerification) {
      if (!data.otp) {
        errors.otp = 'OTP is required';
      } else if (data.otp.length !== 4 || isNaN(data.otp)) {
        errors.otp = 'OTP must be 4 digits';
      }
    }
  
    return errors;
  };
  
  module.exports = { validateOtpData };
  