//iron-node index.js
//node index.js
//git push heroku master
//
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var connection = mysql.createConnection({
  host: 'localhost',
  database: 'test',
  user: '',
  password: '',
  debug: true
});

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send("hola desde la web");
});



app.get('/user', function(request, response) {
  debugger;
  connection.query('SELECT * from user', function(err, users, fields) {
    response.jsonp(users);
  });
});

app.post('/user', function(request, response) {
  var user = request.body;
  connection.query('INSERT into user set ?', user,
    function(err, result) {
      if (!err) {
        user.id = result.insertId;
        response.jsonp(user);
      } else {
        response.status(500);
        response.jsonp(err);
      }
    });
});

app.put('/user', function(request, response) {
  var user = request.body;
  connection.query('update user set name = ? where id=?', [user.name, user.id],
    function(err, result) {
      if (!err) {
        response.jsonp(result);
      } else {
        response.status(500);
        response.jsonp(err);
      }
    });
});

app.delete('/user', function(request, response) {
  var user = request.body;
  connection.query('delete user where id=?', user.id,
    function(err, result) {
      if (!err) {
        response.jsonp(result);
      } else {
        response.status(500);
        response.jsonp(err);
      }
    });
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
