var nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secureConnection: true,
    port: 465,
    auth: {
        user: 'myfriendlist1@gmail.com',
        pass: 'evlsojxtvwsfqwgo'
    }
});