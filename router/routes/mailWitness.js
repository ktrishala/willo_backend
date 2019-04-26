
const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer = require('nodemailer');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var mailTransporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: 'willojb2@gmail.com',
        pass: 'tcawfdwqdwodavrh'
    }
});
router.get('/', function (req, res) {
  console.log("Reached witness mail API");

  function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;}
      db.query('SELECT user_id, email FROM user WHERE user_id in(select user_id from parties where will_id=? and party_type like "%witness")',[req.query.willid], function (error, results, fields) {
         //if (err) throw error;

          for (var i = 0; i < results.length; i++) {
            console.log("Reached here 1", results[i].user_id);
            var token_id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            link="http://"+"localhost:8100" +"/verifyWill?id="+token_id;
            db.query('UPDATE user set token_id=? where user_id=?',[token_id, results[i].user_id], function (error, results1, fields) {
            });
            var mailOptions = {
              from: 'willo@gmail.com', // sender address
              to: results[i].email, // list of receivers
              subject: 'Please verify the will by clicking the link below', // Subject line
              html: link   // plain text body
            };
            mailTransporter.sendMail(mailOptions, function (err, info) {
               if(err)
                 console.log(err)
               else
               res.send({
                 "code":400,
                 "results":true,
                 "msg":"will verification mail sent"
               });
            });
          }
        });
      });
















module.exports = router;
