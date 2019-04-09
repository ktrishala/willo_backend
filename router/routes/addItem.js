const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer = require('nodemailer');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.post('/', function (req, res) {
  //var postData  = req.body;
console.log("Reached add item");
 db.query('INSERT INTO belongings (belonging_name, belongings_desc) VALUES(?, ?)', [req.body.belonging_name, req.body.belongings_desc], function (error, results, fields) {
       if (error) throw error;
       res.send({
         "code":400,
         "result":true
       })
     });
 console.log("Inserting done");

});

module.exports = router;
