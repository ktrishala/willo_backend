var http = require("http");
var express = require('express');
var path= require('path');
var app = express();
var cors = require('cors');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//const app = express();
app.use(cors());

const login=require('./router/routes/login');
const signup=require('./router/routes/signup');
const verify=require('./router/routes/verify');
const home = require('./router/routes/home');
const profile1=require('./router/routes/profile1');
const profile2=require('./router/routes/profile2');
const addBeneficiary=require('./router/routes/addBeneficiary');
const deleteBeneficiary=require('./router/routes/deleteBeneficiary');
const addItem=require('./router/routes/addItem');
const deleteItem=require('./router/routes/deleteItem');
const addWitness=require('./router/routes/addWitness');
const getBeneficiaryList=require('./router/routes/getBeneficiaryList');
const items=require('./router/routes/items');
const getBeneficiaryDetails=require('./router/routes/getBeneficiaryDetails');
const getBeneficiaryAssetMapping=require('./router/routes/getBeneficiaryAssetMapping');
const addExecutors=require('./router/routes/addExecutors');
const getWitness=require('./router/routes/getWitness');
const getExecutors=require('./router/routes/getExecutors');


app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/verify?:id', verify);
app.use('/api/home', home);
app.use('/api/profile1?:willid', profile1);
app.use('/api/profile2?:willid', profile2);
app.use('/api/addBeneficiary?:willid', addBeneficiary);
app.use('/api/addItem?:willid', addItem);
app.use('/api/addWitness?:willid', addWitness);
app.use('/api/deleteBeneficiary?:benid?:willid', deleteBeneficiary);
app.use('/api/getBeneficiaryList?:willid', getBeneficiaryList);
app.use('/api/getBeneficiaryDetails?:id', getBeneficiaryDetails);
app.use('/api/Items?:id', items);
app.use('/api/deleteItem?:belonging_name', deleteItem);
app.use('/api/getBeneficiaryAssetMapping?:benid?:willid:itemid', deleteBeneficiary);
app.use('/api/addExecutors?:willid', addExecutors);
app.use('/api/getWitness?:willid', getWitness);
app.use('/api/getExecutors?:willid', getExecutors);



//start mysql connection
// var connection = mysql.createConnection({
//   host     : 'localhost', //mysql database host name
//   user     : 'root', //mysql database user name
//   password : 'youmayenter', //mysql database password
//   database : 'willodb', //mysql database name
//   multipleStatements : true
// });



// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...')
// })
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
const port = process.env.PORT || 3000;
app.listen(port, (req, res)=>{
  console.log(`RUNNING on port ${port}`);
});


// var server = app.listen(3000,  "127.0.0.1", function () {
//
//   var host = server.address().address
//   var port = server.address().port
//
//   console.log("Example app listening at http://%s:%s", host, port)
//
// });

//rest api to get all results
// app.get('/login', function (req, res) {
//    connection.query('select * from user', function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
//
// //rest api to create a new record into mysql database
// //var query1 = 'INSERT INTO user SET ?';
// //var query2 = 'INSERT INTO will (will_status,create_dt,last_update_dt) VALUES('Incomplete',CURRENT_DATE,CURRENT_DATE)';
// app.post('/signup', function (req, res) {
//    var postData  = req.body;
//    var email = req.body.email;
//    var host = req.get('host');
//    //var token_id = Math.floor((Math.random() * 100) + 54);
//    console.log("The extracted mail is: ", email);
//    function randomString(length, chars) {
//    var result = '';
//    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//    return result;}
//    var token_id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
//    connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
//      if (results.length >0) {
//        // console.log("error ocurred",error);
//        res.send({
//          "code":400,
//          "Error":"Email id has an existing account"
//        })
//      }
//      else{
//         connection.query('INSERT INTO user (password, name, contact, email, token_id) VALUES(?,?,?,?,?)', [req.body.password, req.body.name,req.body.contact,email, token_id], function (error, results, fields) {
//     	  if (error) throw error;
//     	  res.end(JSON.stringify(results));
//     	});
//
//       link="http://"+req.get('host')+"/verify?id="+token_id;
//       var mailOptions = {
//         from: 'willo@gmail.com', // sender address
//         to: email, // list of receivers
//         subject: 'Please confirm your email by clicking the link below', // Subject line
//         html: link   // plain text body
//       };
//       mailTransporter.sendMail(mailOptions, function (err, info) {
//          if(err)
//            console.log(err)
//          else
//            console.log(info);
//       });
//      }
//     });
//    //connection.query('INSERT INTO user SET ?', postData, token_id, function (error, results, fields) {
//
//
//  //  connection.query('INSERT INTO will (will_status,create_dt,last_update_dt) VALUES("Incomplete",CURRENT_DATE,CURRENT_DATE)', function (error, results, fields) {
//  //   if (error) throw error;
//  //   res.end(JSON.stringify(results));
//  // });
// });
//
//
// app.get('/verify',function(req,res){
//   var host = req.get('host');
// console.log(req.protocol+":/"+req.get('host'));
// if((req.protocol+"://"+req.get('host'))==("http://"+host))
// {
//     var rand_id = req.query.id;
//     console.log("Domain is matched. Information is from Authentic email");
//     connection.query('SELECT * FROM user WHERE token_id = ?',[rand_id], function (error, results, fields) {
//     if (error) {
//       // console.log("error ocurred",error);
//       res.send({
//         "code":400,
//         "failed":"error ocurred"
//       })
//     }
//     else {
//       // console.log('The solution is: ', results);
//       if(results.length >0){
//         console.log("Password fetched",results[0].password);
//         if(results[0].token_id === rand_id){
//           console.log("email is verified");
//           var status= 'T';
//           res.end("<h1>Email  is been Successfully verified");
//
//           connection.query('UPDATE `user` SET `email_verified`=? where `token_id`=?', [status, rand_id], function (error, results, fields) {
//           if (error) {
//             // console.log("error ocurred",error);
//             res.send({
//               "code":400,
//               "failed":"error ocurred"
//             })
//           }
//         });
//
//
//         }
//     else
//     {
//         console.log("email is not verified");
//         res.end("<h1>Bad Request</h1>");
//     }
// }
// }
// });
// }
// else
// {
//     res.end("<h1>Request is from unknown source");
// }
//
// });
//
//
//
// //Profile Update
// var query = 'UPDATE user SET contact=?, dob = ?, street_address = ?, county = ? , city = ?, state = ?, marital_status = ?, children = ?  WHERE  email = ?';
// app.put('/profile', function (req, res) {
//   var contact = req.body.contact;
//   var dob = req.body.dob;
//   var street_address = req.body.street_address;
//   var county = req.body.county;
//   var city = req.body.city;
//   var state = req.body.state;
//   var marital_status = req.body.marital_status;
//   var children = req.body.children;
//   var email  = req.body.email;
//    connection.query(query, [contact, dob, street_address, county, city, state, marital_status, children, email], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
//
//
// // Authentication
// app.post('/login', function (req, res) {
//   console.log("Entered here");
//   var email= req.body.email;
//   var password = req.body.password;
//   connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
//   if (error) {
//     // console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }
//
//   else{
//     // console.log('The solution is: ', results);
//     if(results.length >0){
//       console.log("Password fetched",results[0].password);
//
//       if(results[0].password == password){
//         if(results[0].email_verified == 'F'){
//           res.send({
//             "code":205,
//             "success":"Email not verified"
//               });
//
//         }
//         else
//         {
//         res.send({
//           "code":200,
//           "success":"login sucessfull"
//             });
//           }
//
//       }
//       else{
//         res.send({
//           "code":204,
//           "success":"Email and password does not match"
//             });
//       }
//     }
//     else{
//       res.send({
//         "code":204,
//         "success":"Email does not exits"
//           });
//     }
//   }
// });
// });
//
// //rest api to get a single employee data
// app.get('/user/:id', function (req, res) {
//    console.log(req);
//    connection.query('select * from user where user_id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
//
//
//
// //rest api to get a single employee data
// app.get('/employees/:id', function (req, res) {
//    console.log(req);
//    connection.query('select * from employee where id=?', [req.params.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
//
//
//
// //rest api to update record into mysql database
// app.put('/employees', function (req, res) {
//    connection.query('UPDATE `employee` SET `employee_name`=?,`employee_salary`=?,`employee_age`=? where `id`=?', [req.body.employee_name,req.body.employee_salary, req.body.employee_age, req.body.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
//
// //rest api to delete record from mysql database
// app.delete('/employees', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });
//
//
//
//
//
//
//
// /////////////////////////////////////////////////
// app.post('/api/auth', function (req, res) {
//   var email= req.body.email;
//   var password = req.body.password;
//   connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
//   if (error) {
//     // console.log("error ocurred",error);
//     res.send({
//       "code":400,
//       "failed":"error ocurred"
//     })
//   }
//
//   else{
//     // console.log('The solution is: ', results);
//     if(results.length >0){
//       console.log("Password fetched",results[0].password);
//
//       if(results[0].password == password){
//         if(results[0].email_verified == 'F'){
//           res.send({
//             "code":205,
//             "result": false,
//             "success":"Email not verified"
//               });
//
//         }
//         else
//         {
//         res.send({
//           "code":200,
//           "result": true,
//           "success":"login sucessfull"
//             });
//           }
//
//       }
//       else{
//         res.send({
//           "code":204,
//           "result": false,
//           "success":"Email and password does not match"
//             });
//       }
//     }
//     else{
//       res.send({
//         "code":204,
//         "result": false,
//         "success":"Email does not exits"
//           });
//     }
//   }
// });
// });
