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

// router.get('/check', function (req, res) {
//    db.query('select * from user', function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

var query = 'UPDATE user SET contact=?, dob = ?, street_address = ?, county = ? , city = ?, state = ?  WHERE  email = ?';
router.post('/', function (req, res) {
  var contact = req.body.contact;
  var street_address = req.body.street_address;
  var county = req.body.county;
  var city = req.body.city;
  var state = req.body.state;
  var email  = req.body.email;
  var dob = req.body.dob;
   db.query(query, [contact, dob, street_address, county, city, state, email], function (error, results, fields) {
	  if (error) throw error;
    res.send({
      "code":400,
      "result":true,
      "msg": "success"
    })
	});
});

// router.get('/user/:id', function (req, res) {
//    console.log(req);
//    db.query('select * from user where user_id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

module.exports = router;
