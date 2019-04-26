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
console.log("Reached map item to beneficiary");
console.log(req.query.willid);
console.log(req.body.belongings_id);
console.log(req.body.pct_allocation);
console.log(req.body.user_id);
db.query('SELECT SUM(pct_allocation) as sum_pct_allocation from beneficiary_belongings where will_id=? and belongings_id=?', [req.query.willid, req.body.belongings_id], function (error, results, fields) {
    if (error) throw error;
    else if(results[0].sum_pct_allocation===100){
      console.log("Entered here 1");
      res.send({
        "code":400,
        "result":false,
        "msg": "This item is already allocated 100%"
      });
    }
    else if((req.body.pct_allocation+ results[0].sum_pct_allocation)<=100 && results[0].sum_pct_allocation===0){
      console.log("Entered here 2");
      db.query('UPDATE beneficiary_belongings SET user_id =?, pct_allocation = ? where will_id=? and belongings_id=?', [req.body.user_id, req.body.pct_allocation, req.query.willid, req.body.belongings_id], function (error, results, fields) {
            res.send({
              "code":200,
              "result":true,
              "msg": "Sucessfully added"
            });
      });
    }
    else if((req.body.pct_allocation+ results[0].sum_pct_allocation)<=100 && results[0].sum_pct_allocation!=0){
      console.log("Entered here 3");
      db.query('INSERT INTO beneficiary_belongings (belongings_id, will_id, user_id, pct_allocation) VALUES(?, ?, ?, ?)', [req.body.belongings_id, req.query.willid, req.body.user_id, req.body.pct_allocation], function (error, results, fields) {
            res.send({
              "code":200,
              "result":true,
              "msg": "Successfully Added"
            });
      });
    }
    else if((req.body.pct_allocation+ results[0].sum_pct_allocation)>100){
      console.log("Entered here 4");
      var remaining_pct =100- results[0].sum_pct_allocation;
            res.send({
              "code":400,
              "result":false,
              "msg": "Pct Allocation exceeds 100%",
              "remaining_pct" : remaining_pct
            });
    }
});
});
module.exports = router;
