// var mailTransporter = nodemailer.createTransport({
//  service: 'gmail',
//  auth: {
//         user: 'willojb2@gmail.com',
//         pass: 'tcawfdwqdwodavrh'
//     }
// });
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
const sgMail = require('@sendgrid/mail');

router.get('/', function (req, res) {
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'tkaushik64@gmail.com',
  from: 'hello@willo.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
});

module.exports = router;
