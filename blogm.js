var express = require('express'),
    app = express();
    fs = require('fs');


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());



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
res.render('home', { title: 'ejs' });
});


app.get('/500', function(req, res){
    res.send('<h1>Internal Server Error</h1>');
});

app.get('/404', function(req, res){
    res.send('Page Not Found');
});

///////////////// routes to read the data ////////////////////////








app.listen(8888);
console.log('Express server started on port 8888');

