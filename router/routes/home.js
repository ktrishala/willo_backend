const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
  console.log("Reached here home API;");
   console.log(req.query.willid);
   var query1 = 'SELECT a.will_id as willid, COUNT(CASE WHEN party_type = "beneficiary" THEN 1 END) AS beneficiary_count, COUNT(CASE WHEN party_type = "witness" THEN 1 END) AS witness_count, COUNT(CASE WHEN party_type = "executor" THEN 1 END) AS executor_count FROM parties a WHERE a.will_id=? GROUP BY willid';
   var query2 = 'SELECT b.will_id as willid, COUNT(belongings_id) as belongings_count FROM beneficiary_belongings b WHERE b.will_id=? GROUP BY willid';
   db.query(query1, [req.query.willid], function (error, results1, fields) {
	 db.query(query2, [req.query.willid], function (error, results2, fields) {
    res.send({
      "code":400,
      "result":true,
      "willid":results1[0].willid,
      "beneficiary_count":results1[0].beneficiary_count,
      "witness_count":results1[0].witness_count,
      "executor_count":results1[0].executor_count,
      "belongings_count":results2[0].belongings_count
    });
  });
	});
});

module.exports = router;
