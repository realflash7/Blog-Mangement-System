var express = require('express');
    app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
var myData  = require('./myData.json');
app.get('/', function(req, res){
    res.send(myData);
});
app.get('/500', function(req, res){
    res.send('<h1>Internal Server Error</h1>');
});
app.get('/404', function(req, res){
    res.send('Page Not Found');
});

///////////////// routes to read the data ////////////////////////
app.get('/getdata', function(req, res){
  console.log(req.query.q);
    res.send(myData[req.query.q]);
});
//////////////////// end routes to read the data //////////////////////////
 



app.get('/create',function(req,res){
  var h="<h1>CREATE</h1>"+
      "<h3>id title blogbody noOfComemm creData</h3>"+
        "<form action='/create/data' method='post'>"+  
        "<input type ='text' name='_id'>"+
        "<input type ='text' name='title'>"+
        "<input type ='text' name='blogBody'>"+
        "<input type ='text' name='numberOfComments'>"+
        "<input type ='text' name='creationDate'>"+
        "<br><br><br><button type='submit'>submit_re</button>";
        res.send(h);
        });
///////////////// routes to create data ///////////////////////

app.post('/create/data', function(req, res){
   	console.log(req.body);
    console.log('create data');
   	var newBlogPost = {
   		_id 				: req.body._id,
   		title 				: req.body.title,
   		blogBody 			: req.body.blogBody,
   		numberOfComments 	: req.body.numberOfComments,
   		creationDate 		: req.body.creationDate
   	}
   	myData.push(newBlogPost);
   	res.send(myData);
});
//////////////////// end route to create data //////////////////////////
/// routes to modify data ////////////////////
app.put('/:id/edit', function(req, res){
   	console.log(req.body);
   	var i;
   	for (i in myData){
   		if(myData[i]._id==req.params.id){
   			console.log("yes");
   			myData[i].title = req.body.title;
   			res.send(myData);
   		}// end if
   	}// end for 
   //res.send("no such entry found")
});
// end routes to modify data ////////////////////
/// routes to delete data ////////////////////
app.post('/:position/delete', function(req, res){
	myData.splice(req.params.position,1);
	res.send(myData);
   
   
});


// end routes to modify data ////////////////////
app.listen(8888);
console.log('Express server started on port 8888');