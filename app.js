var express = require('express'),
    app = express();
    fs = require('fs')
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
//Bootstrap models
var models_path =  './models'
// fs is used to manipulate and read files
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})
// Bootstrap controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      var route = require('./controllers/' + file);
      route.controller(app);
      //route.controller(app,passport,auth);
  }
});




// including the database here 
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/myblogdb');
mongoose.connection.once('open', function() {
  console.log("database connection open success");
});

/// end database inclusion
app.get('/', function(req, res){
    res.send('Hello World');
});
app.get('/500', function(req, res){
    res.send('<h1>Internal Server Error</h1>');
});
app.get('/404', function(req, res){
    res.send('Page Not Found');
});
///////////////// routes to read the data ////////////////////////
// supply a request param
app.get('/getBlog/:number/:other/:onemore', function(req,res){
  
  console.log(req.params.number);
  console.log(req.params.other);
  console.log(req.params.onemore);
  res.send(req.params.onemore);
});
// supply a query param
app.get('/search', function(req,res){
  //q is the query param 
  console.log(req.query.q);
  console.log(req.query.another);
  
  res.send(req.query.another);
});
//////////////////// end routes to read the data //////////////////////////
///////////////// routes to create data ////////////////////////
app.post('/create/data', function(req, res){
   
});
//////////////////// end route to create data //////////////////////////
/// routes to modify data ////////////////////
app.put('/:id/edit', function(req, res){
   	
});
// end routes to modify data ////////////////////
/// routes to delete data ////////////////////
app.post('/:position/delete', function(req, res){
	
   
});
// end routes to modify data ////////////////////
app.listen(8888);
console.log('Express server started on port 8888');