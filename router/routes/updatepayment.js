const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


router.post('/', function (req, res) {
  console.log("Reached here update last payment dt");
   console.log(req.query.willid);
   var due_date;
   db.query('select MAX(due_date)as due_date from finance where will_id=?', [req.query.willid], function (error, results, fields) {
   });
   if(results.length>0){
     due_date=results[0].due_date;
     db.query('INSERT into finance(will_id,last_payment_dt, amount)VALUES(?,?,?)', [req.query.willid, req.body.last_payment_dt, req.body.amount], function (error, results, fields) {
     });
     db.query('UPDATE finance set due_date= DATE_ADD(due_date, INTERVAL 1 YEAR) where due_date is null and will_id=?', [req.query.willid], function (error, results, fields) {
       res.send({
         "code":400,
         "result":true,
         "msg": "payment updated"
       });
     });
   }
   else{
     db.query('INSERT into finance(will_id,last_payment_dt, amount)VALUES(?,?,?)', [req.query.willid, req.body.last_payment_dt, req.body.amount], function (error, results, fields) {
     });
     db.query('UPDATE finance set due_date= DATE_ADD(last_payment_dt, INTERVAL 1 YEAR) where due_date is null and will_id=?', [req.query.willid], function (error, results, fields) {
       res.send({
         "code":400,
         "result":true,
         "msg": "payment updated"
       });
     });
   }
});


module.exports = router;
