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
 var email = req.body.email;
 var name = req.body.name;
 var dob =req.body.dob;
 var relationship = req.body.relationship;
 var contact = req.body.contact;
console.log("checking the will id", req.query.willid);

db.query('SELECT * FROM parties WHERE will_id = ? and party_type in ("primary executor", "secondary executor")', [req.query.willid], function (error, results, fields) {
  if(results.length<2){
    db.query('INSERT INTO user (name, email, dob, relationship, contact) VALUES(?,?,?,?,?)', [name, email, dob, relationship, contact], function (error, results, fields) {
          if (error) throw error;
        });
    console.log("Inserting done");
    db.query('SELECT user_id FROM user WHERE email = ?', [email], function (error, results, fields) {

      if (error) throw error;
      var resm = results[0].user_id;

      db.query('SELECT * FROM parties WHERE will_id = ? and party_type="primary executor"', [req.query.willid], function (error, results, fields) {
        if(results.length==0){
          var name = "primary executor";
          var status = null;
          db.query('INSERT INTO parties (party_type, will_id, user_id, user_status) VALUES (?,?,?,?)',[name, req.query.willid, resm, status], function (error, results, fields) {
          if (error) throw error;
          else{
            var details = 'Added Executor ' + req.body.name ;
            db.query('INSERT INTO log (will_id, log_details) VALUES (?,?)',[req.query.willid, details], function (error, results, fields) {
            });
            res.send({
              "code":400,
              "result":true
            });
          }
         });
        }
        else{
          var name = "secondary executor";
          var status = null;
          db.query('INSERT INTO parties (party_type, will_id, user_id, user_status) VALUES (?,?,?,?)',[name, req.query.willid, resm, status], function (error, results, fields) {
          if (error) throw error;
          else
              var details = 'Added Executor ' + req.body.name ;
              db.query('INSERT INTO log (will_id, log_details) VALUES (?,?)',[req.query.willid, details], function (error, results, fields) {
              });
              res.send({
                "code":400,
                "result":true
              });
           });
        }



      });



   });
  }
  else{
    res.send({
      "code":400,
      "result":false,
      "msg":"Two Executors Already Added"
    });
  }
});
});

module.exports = router;
