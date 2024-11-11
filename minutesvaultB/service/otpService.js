const Otp = require('../model/otpModel');
const emailService = require('./emailService');
const Messages= require('../constants/message')

const generateOtp = () => {
  const otpLength = 4;
  let otp = '';
  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};


const sendOtp = async (email) => {
  try {
    const now = Date.now();
    let otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });


    if (otpRecord && otpRecord.attempts >= 3) {
      const timeSinceLastAttempt = (now - otpRecord.createdAt) / (60 * 1000); 
      if (timeSinceLastAttempt < 10) {
        throw new Error(Messages.maxOTP);
      } else {
        
        otpRecord.attempts = 0;
        otpRecord.isValid = false;
        await otpRecord.save();
      }
    }

   
    const otp = generateOtp();
    const otpExpiry = new Date(now + 5 * 60 * 1000); 

    if (otpRecord) {
      otpRecord.otp = otp;
      otpRecord.attempts += 1;
      otpRecord.createdAt = now;
      otpRecord.otpExpiry = otpExpiry;
      otpRecord.isValid = true;
      await otpRecord.save();
    } else {
      otpRecord = new Otp({
        email,
        otp,
        attempts: 1,
        createdAt: now,
        otpExpiry: otpExpiry,
        isValid: true
      });
      await otpRecord.save();
    }


    const emailSubject = 'OTP to Verify Your Email to Schedule a Demo with MinutesVault';
    const mailData = `Thank you for your interest in scheduling a demo with MinutesVault! Before we proceed, please verify your email address by using the following One-Time Password (OTP). OTP <strong>${otp}</strong>`;
    await emailService.sendEmail(email, emailSubject, mailData);

    return { success: true, otpSent: true, attempts: otpRecord.attempts };
  } catch (error) {
    console.error('Error requesting OTP:', error);
    return { success: false, error: 'Server error, please try again later.' };
  }
};



const verifyOtp = async (email, inputOtp) => {
  try {
    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      throw new Error();
    }

    
    console.log('Last Verified At (UTC):', otpRecord.lastVerifiedAt);
    console.log('Last Verified At (Local):', new Date(otpRecord.lastVerifiedAt).toLocaleString());

    if (otpRecord.attempts >= 3) {
      throw new Error(Messages.maxOTP);
    }

    const otpCreatedAt = otpRecord.createdAt;
    const tenMinutes = 10 * 60 * 1000; 
    const isExpired = Date.now() - otpCreatedAt.getTime() > tenMinutes;

    if (isExpired) {
      throw new Error(Messages.otpNotFound);
    }

    
    if (otpRecord.lastVerifiedAt) {
      const timeSinceLastVerification = Date.now() - otpRecord.lastVerifiedAt.getTime();
      console.log('Time since last verification (ms):', timeSinceLastVerification);

      if (timeSinceLastVerification < tenMinutes) {
        throw new Error(Messages.verifyError);
      }
    }

    
    if (otpRecord.otp !== inputOtp) {
      otpRecord.attempts += 1; 
      await otpRecord.save();
      throw new Error(Messages.otpInvalid);
    }

    
    otpRecord.lastVerifiedAt = new Date();
    await otpRecord.save();

    return { message: 'OTP verified successfully' };
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    throw error;
  }
};







module.exports = {
  sendOtp,
  verifyOtp,
};
