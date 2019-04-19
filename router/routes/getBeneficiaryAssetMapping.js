const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer = require('nodemailer');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// router.get('/', function (req, res) {
// db.query('SELECT b.name as name, c.belonging_name as belonging_name from beneficiary_belongings a inner join user b on a.user_id = b.user_id inner join belongings c on a.belongings_id = c.belongings_id where a.user_id=? and a.belongings_id=? and a.will_id=?;' ,req.query.benid, req.query.itemid, req.query.willid, function (error, results, fields) {
//         if (error) throw error;
//         res.send(JSON.stringify(results));
//       });
// });

router.get('/', function (req, res) {
  console.log("Reached ben asset mapping");
db.query('SELECT b.name as name, c.belonging_name as belonging_name from beneficiary_belongings a inner join user b on a.user_id = b.user_id inner join belongings c on a.belongings_id = c.belongings_id where a.will_id=?;' ,req.query.willid, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
      });
});

module.exports = router;
