const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer =require ('nodemailer');
const sgMail = require('@sendgrid/mail');

// var mailTransporter = nodemailer.createTransport({
//           service: 'gmail',
//            auth: {
//                   user: 'willojb2@gmail.com',
//                   pass: 'tcawfdwqdwodavrh'
//               }
//           });

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var SENDGRID_APY_KEY ='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';
sgMail.setApiKey(SENDGRID_APY_KEY);

router.post('/', function (req, res) {

  console.log("Reached the post in customer mail");
  var emailid = req.body.emailID;
  var feedback= req.body.feedback;
  var response = req.body.response;
  console.log("The variables are:"+emailid+" "+feedback+" "+response);
  db.query('SELECT user_id FROM user WHERE email = ?',[emailid], function (error, results, fields) {
  if (error) {
     console.log("error ocurred",error);
  }
   else{
    if(results[0]){
      console.log("Reached results[0] condition");
      var user_id =results[0].user_id;
      db.query('UPDATE user_feedback SET admin_feedback =?, resolved ="Y" where user_id=? and feedback=?',[response, user_id, feedback],
       function (error, results, fields) {
      if (error) {
          console.log("error ocurred",error);
       }
       var mailOptions = {
        from: 'Willo <hello@mywillo.com>', // sender address
        to: emailid, // list of receivers
        subject: 'From Willo:Your online will making app', // Subject line
        html: response   // plain text body
      };
      sgMail.send(mailOptions, function (err, info) {
         if(err){
           console.log("Sent a false");
           res.send({
          "code":200,
          "result":false
          })
         }
         else {
          console.log(info);
           res.send({
            "code":200,
            "result":true
          });
         }
      });
     });
    }
  }
});
});



module.exports = router;
