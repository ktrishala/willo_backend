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
router.post('/', function (req, res) {
   var postData  = req.body;
   var email = req.body.email;
   var host = req.get('host');
   //var token_id = Math.floor((Math.random() * 100) + 54);
   console.log("The extracted mail is: ", email);
   function randomString(length, chars) {
   var result = '';
   for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
   return result;}
   var token_id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
   db.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
     if (results.length >0) {
       // console.log("error ocurred",error);
       res.send({
         "code":400,
         "msg":"Email id has an existing account",
         "results": false
       })
     }
     else{
        db.query('INSERT INTO user (password, name, contact, email, token_id) VALUES(?,?,?,?,?)', [req.body.password, req.body.name,req.body.contact,email, token_id], function (error, results, fields) {
    	  if (error) throw error;
    	});
      //req.get('host')
      var link="http://"+"localhost:8100" +"/verify?id="+token_id;
      var mailOptions = {
        from: 'willo@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Thanks for signing up with Willo! Please confirm your email address here.', // Subject line
        html: link   // plain text body
      };
      mailTransporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
         res.send({
           "code":400,
           "results":true,
           "msg":"verification mail sent"
         });
      });
     }
    });
});


module.exports = router;
