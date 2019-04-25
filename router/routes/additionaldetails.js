const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var db = require('../../db');
var nodemailer = require('nodemailer');

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));





//var query = 'UPDATE user SET marital_status = ?, children = ?  WHERE  email = ?';
router.post('/', function (req, res) {
  console.log("Reached profile 2");
  console.log(req.body.nameofchild);
  for(var key in req.body.nameofchild.hasOwnProperty(key)){
    console.log(key);
    console.log(req.body.nameofchild[key].name);
    var child_name= req.body.nameofchild[key].name;
    db.query('INSERT INTO children (will_id, children_name) VALUES(?, ?)', [req.query.willid, child_name], function (error, results, fields) {
    });
  }
  // var children = req.body.children;
  // var email  = req.body.email;
  //  db.query(query, [marital_status, children, email], function (error, results, fields) {
	//   if (error) throw error;
	//   else if(children.localeCompare("Y")==0){
  //     console.log("Entered here", children);
  //     db.query('SELECT user_id from user where email=?', [email], function (error, results, fields) {
  //       var user_id = results[0].user_id;
  //       db.query('SELECT will_id from parties where user_id=? and party_type="owner"', [user_id], function (error, results1, fields) {
  //         var will_id=results1[0].will_id;
  //         db.query('UPDATE will SET children =? where will_id=?', [children, will_id], function (error, results, fields) {
  //         });
  //         db.query('INSERT INTO children (will_id, children_name, children_dob) VALUES(?, ?, ?)', [will_id, req.body.children_name, req.body.children_dob], function (error, results, fields) {
  //           res.send({
  //             "code":400,
  //             "result":true,
  //             "msg": "success"
  //           })
  //         });
  //       });
  //     });
  //   }
	// });
});




// var query = 'UPDATE user SET marital_status = ?, children = ?  WHERE  email = ?';
// router.post('/', function (req, res) {
//   var marital_status = req.body.marital_status;
//   var children = req.body.children;
//   var email  = req.body.email;
//    db.query(query, [marital_status, children, email], function (error, results, fields) {
// 	  if (error) throw error;
// 	  else if(children.localeCompare("Y")==0){
//       console.log("Entered here", children);
//       db.query('SELECT user_id from user where email=?', [email], function (error, results, fields) {
//         var user_id = results[0].user_id;
//         db.query('SELECT will_id from parties where user_id=? and party_type="owner"', [user_id], function (error, results1, fields) {
//           var will_id=results1[0].will_id;
//           db.query('UPDATE will SET children =? where will_id=?', [children, will_id], function (error, results, fields) {
//           });
//           db.query('INSERT INTO children (will_id, children_name, children_dob) VALUES(?, ?, ?)', [will_id, req.body.children_name, req.body.children_dob], function (error, results, fields) {
//             res.send({
//               "code":400,
//               "result":true,
//               "msg": "success"
//             })
//           });
//         });
//       });
//     }
// 	});
// });

// router.get('/user/:id', function (req, res) {
//    console.log(req);
//    db.query('select * from user where user_id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

module.exports = router;
