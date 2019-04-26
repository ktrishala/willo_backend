const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.get('/', function (req, res) {
  console.log("Reached useraccounts in server");
   db.query('select c.name as name, c.email as email, c.user_id as user_id from willodb.will a inner join willodb.parties b on a.will_id and b.will_id and b.party_type="owner" inner join willodb.user c on b.user_id=c.user_id group by name, email, user_id ', function (error, results, fields) {
    if (error) throw error;
    console.log(JSON.stringify(results));
    res.send(JSON.stringify(results));
  });
});

module.exports = router;
