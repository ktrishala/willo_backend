const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


router.get('/', function (req, res) {
  console.log("Reached here list witness;");
   console.log(req.query.willid);
   db.query('select user_id, name, email, contact from user where user_id in (select user_id from parties where will_id =? and party_type in ("primary witness", "secondary witness","tertiary witness"))', [req.query.willid], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});


module.exports = router;
