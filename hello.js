var express = require('express');
var app = express();

app.listen(4000, function() {
  console.log("YA LEVANTE");
});

app.get("/hello", function(resquest, response) {
  console.log("llamaron al hello");
  response.send("hola mundo");
});
