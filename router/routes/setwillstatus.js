const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

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
  console.log("Reached mark will complete");
   db.query('UPDATE will set will_status="COMPLETE" where will_id=?',[req.query.will_id],function (error, results, fields)
  {
    if (error) throw error;
    console.log(JSON.stringify(results));
    const mailOptions = {
      to: email,
      from: 'hello@willo.com',
      subject: 'The filing of your will is completed',
      html: 'Hello '+name+' , your will is now available.',
    };
    mailTransporter.sendMail(mailOptions, function(error, info){
       if(err)
         console.log(err)
    });
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
