export const validateOtpData = (data) => {
    const errors = {};

    // Basic email validation
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = 'Invalid email format';
    }

    // Only check OTP validation when verifying OTP (not needed for sending OTP)
    if (data.otp && (data.otp.length !== 4 || isNaN(data.otp))) {
        errors.otp = 'OTP must be 4 digits';
    }

    return errors;
};


