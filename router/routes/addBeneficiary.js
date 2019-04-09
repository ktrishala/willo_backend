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
        pass: 'youmayenter'
    }
});

// router.get('/user/:id', function (req, res) {
//    console.log(req);
//    db.query('select * from user where user_id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });


router.post('/', function (req, res) {
  //var postData  = req.body;
 var email = req.body.email;
 var name = req.body.name;
 var dob =req.body.dob;
 var relationship = req.body.relationship;
 var contact = req.body.contact;
console.log("checking the will id", req.query.willid);

 db.query('INSERT INTO user (name, email, dob, relationship, contact) VALUES(?,?,?,?,?)', [name, email, dob, relationship, contact], function (error, results, fields) {
       if (error) throw error;
     });
 console.log("Inserting done");
 db.query('SELECT user_id FROM user WHERE email = ?', [email], function (error, results, fields) {

   if (error) throw error;
   var resm = results[0].user_id;
   var name = "beneficia";
   var status = null;

   db.query('INSERT INTO parties (party_type, will_id, user_id, user_status) VALUES (?,?,?,?)',[name, req.query.willid, resm, status], function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
});
});
});

module.exports = router;
