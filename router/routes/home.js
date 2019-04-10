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
   var query = 'SELECT a.will_id as willid, COUNT(CASE WHEN party_type = "beneficiary" THEN 1 END) AS beneficiary_count, COUNT(CASE WHEN party_type = "witness" THEN 1 END) AS witness_count, COUNT(CASE WHEN party_type = "executor" THEN 1 END) AS executor_count, COUNT(belongings_id) as belongings_count FROM parties a inner join beneficiary_belongings b on a.will_id =b.will_id WHERE a.will_id=? GROUP BY willid';
   db.query(query, [req.query.willid], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

module.exports = router;
