
const { transporter, mailOptions } = require('../eMailSetup/mailsetUp'); // Your Nodemailer setup

const sendEmail = async (email, emailSubject, mailData, attachedFileDetails = []) => {
    const mailOptionsInfo = {
        from: mailOptions.from,  // Default sender email (configured in mailsetUp)
        to: email,  // Recipient email
        subject: emailSubject,  // Email subject
        html: mailData,  // Email body in HTML
        attachments: attachedFileDetails,  // Attachments (if any)
    };

    try {
        const isSuccess = await transporter.sendMail(mailOptionsInfo);
        console.log('Email sent:', isSuccess);
        return isSuccess;  // Returning success (or response from Nodemailer)
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};


module.exports = { sendEmail };
