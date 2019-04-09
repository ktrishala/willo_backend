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

router.get('/check', function (req, res) {
   db.query('select * from user', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

var query = 'UPDATE user SET contact=?, dob = ?, street_address = ?, county = ? , city = ?, state = ?, marital_status = ?, children = ?  WHERE  email = ?';
router.put('/profile', function (req, res) {
  var contact = req.body.contact;
  var dob = req.body.dob;
  var street_address = req.body.street_address;
  var county = req.body.county;
  var city = req.body.city;
  var state = req.body.state;
  var marital_status = req.body.marital_status;
  var children = req.body.children;
  var email  = req.body.email;
   db.query(query, [contact, dob, street_address, county, city, state, marital_status, children, email], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

router.get('/user/:id', function (req, res) {
   console.log(req);
   db.query('select * from user where user_id=?', [req.params.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
