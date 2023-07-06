const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'clinton0@ethereal.email',
        pass: 'KHGd1EVW5m6Yk3YDYk'
    }
});

module.exports = transporter;