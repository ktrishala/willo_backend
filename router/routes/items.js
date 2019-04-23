const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));



router.get('/', function (req, res) {
  console.log("Reached here item;");
   console.log(req.query.willid);
   db.query('SELECT belongings_id, belongings_name, belongings_category, belongings_desc from belongings where belongings_id in (select belongings_id from beneficiary_belongings where will_id =?)', [req.query.willid], function (error, results, fields) {
  	  if (error) throw error;
  	  res.end(JSON.stringify(results));
   });
});

module.exports = router;
