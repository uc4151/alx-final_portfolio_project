const nodemailer = require('nodemailer');

// Create a nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // Use SSL/TLS
    auth: {
        user: process.env.SMTP_USER, // my email address
        pass: process.env.SMTP_PASS, // my email password or app password
    },
});

// Exporting the transporter so I can use it in other files
module.exports = transporter;