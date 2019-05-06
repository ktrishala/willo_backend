const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
   console.log("The will id is:"+req.query.will_id);
   db.query('SELECT a.* , b.will_id from belongings a inner join beneficiary_belongings b on a.belongings_id=b.belongings_id and b.will_id=?',
   	[req.query.will_id], function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
     var query3 = 'SELECT log_details, DATE(log_ts) as last_updated_dt from log where will_id=? order by log_ts desc limit 1';
     db.query(query3, [req.query.willid], function (error, results3, fields) {
       console.log(JSON.stringify(results3));
       results.push(results3);
      res.send(JSON.stringify(results));
    });

	});
});

module.exports = router;
