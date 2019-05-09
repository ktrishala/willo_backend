
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
const sgMail = require('@sendgrid/mail');
var mailTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'willojb2@gmail.com',
        pass: 'tcawfdwqdwodavrh'
    }
});

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
console.log("Reached here");
var SENDGRID_APY_KEY ='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';
sgMail.setApiKey(SENDGRID_APY_KEY);
db.query('SELECT name, email FROM user where user_id in(SELECT user_id from parties where will_id=? and party_type="owner"', [req.query.will_id],function (error, results, fields) {
var name =results[0].name;
var email = results[0].email;
const msg = {
  to: email,
  from: 'hello@willo.com',
  subject: 'The filing of your will is completed',
  html: 'Hello '+name+' , your will is now available.',
};
//sgMail.send(msg);
mailTransporter.sendMail(mailOptions, function(error, info){
res.send({
"code":200,
"result":true
});
});


});

module.exports = router;
