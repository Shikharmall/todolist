//const mysql = require('mysql');

/*const con = mysql.createConnection({
  connectionLimit: 50,
  host:"localhost",
  user:"root",
  password:"",
  database:"todolist"
});*/


var mysql = require("mysql");

config = {

  connectionLimit: 50,
  host:"localhost",
  port: "3306",
  user:"root",
  password:"",
  database:"todolist"
};

var con= mysql.createPool(config);


module.exports = con;


