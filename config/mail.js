const nodemailer = require('nodemailer');
const config = require('./environment');

const transport = nodemailer.createTransport(config.mail.smtp);

module.exports = transport;
