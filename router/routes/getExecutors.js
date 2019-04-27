const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
  console.log("Reached here executors details;");
   console.log(req.query.willid);
   db.query('SELECT * FROM parties WHERE will_id = ? and party_type in ("primary executor", "secondary executor")', [req.query.willid], function (error, results, fields) {
     if(results.length===0){
       res.send({
         "code":400,
         "result":false,
         "msg":"No Executor added yet"
       });
     }
     else if(results.length===1){
       db.query('SELECT user_id, name, email, dob, relationship, contact from user where user_id=? ', [results[0].user_id], function (error, results, fields) {
             if (error) throw error;
              res.send(JSON.stringify(results));
           });
     }
     else if(results.length===2){
       db.query('SELECT user_id, name, email, dob, relationship, contact from user where user_id in(?,?)', [results[0].user_id, results[1].user_id], function (error, results, fields) {
             if (error) throw error;
             res.send(JSON.stringify(results));
           });

     }
  });
});

module.exports = router;
