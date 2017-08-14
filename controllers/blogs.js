// this  is a controller

var mongoose = require('mongoose');

var blogModel = mongoose.model('Blog');
var userpModel=mongoose.model('Userp')
var dialog = require('dialog');

// module.exports is used to export some function out of a file
module.exports.controller = function(app){

	// routes to get data 

app.get('/blogs/adminlogin', function(req, res){
res.render('home_admlogin', { title: 'ejs' });
});


app.get('/blogs/admin', function(req, res){
res.render('admin', { title: 'ejs' });
});

app.post('/blogs/adduser',function(req,res){
	console.log('adduser');

	userpModel.findOne({'userName':req.body.username},function(err,result){

			if(err){
				console.log(err);
				res.send('error....');
			}
			else{
					if(result)
					{
						dialog.info('User Already Exists','Muh me le ke naach',function(err){
							if(!error){
								console.log('Naach Liya !!!!');
							}
						});
						console.log('user already exists');
						res.render('admin', { title: 'ejs' });
					}

				
	else{		
	if(!req.body.username||!req.body.password||!req.body.cpassword)
		{
			console.log('null hai koi');
			res.render('admin', { title: 'ejs' });
		}
	else if(req.body.password!=req.body.cpassword)
		{
			console.log('same ni h');
			res.render('admin', { title: 'ejs' })
		}
	else
	{
		console.log('now ok');
		var newUser = new userpModel	(

					{

						userName			: req.body.username,
						passWord			: req.body.password
						
					}

			);

			newUser.save(function(err){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					
					res.render('admin_succ');

				}


			});
	}
}
		}
		}); 
})

app.get('/blogs/admin_succ', function(req, res){
	console.log('add successful');
res.render('admin_succ', { title: 'ejs' });

});

app.get('/blogs/userlogin', function(req, res){
res.render('home_userlogin', { title: 'ejs' });
});

app.post('/blogs/userss',function(req,res){
	console.log('userlogin');
	if(!req.body.username||!req.body.password)
		{
			console.log('null hai koi');
			res.render('home_userlogin', { title: 'ejs' });
		}
		else
		{
			userpModel.findOne({'userName':req.body.username},function(err,result){

			if(err){
				console.log(err);
				res.send('error....');
			}
			else{
					if(!result)
					{
						console.log('no user by dis username');
						res.render('home_userlogin', { title: 'ejs' });
					}
					else if(result.passWord!=req.body.password){
						console.log('wrong passWord');
						res.render('home_userlogin', { title: 'ejs' });
					}
					else
					{
						console.log('passWord matches');
						res.redirect('/blog/user/'+result.userName);

					}

				
			}
		}); 
		}
})























app.get('/blogs/allblogs', function(req, res){



console.log('all blogs');
		blogModel.find({}).sort({'creationDate':-1}).exec(function(err,result){
			if(err){
				console.log(err);
				res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
			}
			else{
            	console.log(result);
				res.render('all_blogs', { title: result });
				
				 
			}
});
	});



	app.get('/blogs/ind_blog/:id', function(req, res){

		blogModel.findOne({'_id':req.params.id},function(err,result){

			if(err){
				console.log(err);
				res.send('error........');
			}
			else{

				res.render('indi_blog', { title: result.title, post: result});
				//res.send(result);
			}
		}); // end find command 		
	   
	}); // end data function



	app.get('/blogs/create/:id', function(req, res){
		console.log(req.params.id);
		res.render('create', { u:req.params.id});

	});	

	app.post('/blogs/create/blog/:id', function(req, res){
			console.log(req.params.id);
			var today = Date.now();
			var zero=0;
			var newBlog = new blogModel	(

					{

						title			: req.body.title,
						subtitle 		: req.body.subtitle,
						blogBody   		: req.body.blogBody,
						creationDate 	: today,
						author			: req.params.id
						
					}

			);

			newBlog.save(function(err){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					
					res.redirect('/blogs/mera_blog/'+newBlog.id);

				}


			});//end save
	   
	}); // end data function

	app.get('/blog/user/:id',function(req,res){

console.log('user blogs',req.params.id);
		blogModel.find({'author':req.params.id}).sort({'creationDate':-1}).exec(function(err,result){

			if(err){
				console.log(err);
				res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
			}
			else{
            	console.log(result);
            	if(!result)
            	{
            		console.log('no user');
            		res.render('home_userlogin', { title: 'ejs' });
            	}
            	else      {
            	console.log('user found');    		
				res.render('user', { u:req.params.id,title: result });
				}
				 
			}
});
	})

app.get('/blogs/mera_blog/:id',function(req,res){
	blogModel.findOne({'_id':req.params.id},function(err,result){

			if(err){
				console.log(err);
				res.send('error........');
			}
			else{

				res.render('merablog', { post: result });
				console.log('mera_blog');
			}
		}); 
	
})


app.get('/blogs/editblogg/:id',function(req,res){
	console.log('edit request found');
	res.render('editblog',{u:req.params.id});
})


app.post('/blogs/edit/blog/:id',function(req,res){
	blogModel.findOne({'_id':req.params.id}).exec(function(err,result){

			if(err){
				res.send(err);
			}
			else{

				console.log(result);
				result.title=req.body.title;
				result.subtitle=req.body.subtitle;
				result.blogBody=req.body.blogBody;
				blogModel.update({'_id':req.params.id},result,{multi:true}).exec(function(err,result){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{

					//res.send(result);
					console.log("edit done");
					res.redirect("/blogs/mera_blog/"+req.params.id);

				}


			});

			}


		});
});














		   








	//routes to delete the blog


	app.post('/blogs/delete_blog', function(req, res){
				console.log('deleting blog..',req.query.a);
				console.log('author'+req.query.b);
			
			blogModel.remove({'_id':req.query.a},function(err,result){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					console.log('delete successful------',req.query.b);
					res.redirect('/blog/user/'+req.query.b);
					}


			});//end blogmodel find 
				
		   
		}); // end delete request




	//end routes to delete the data


	//delete user
	app.post('/blogs/delete_user/:id', function(req, res){
				
			blogModel.remove({'author':req.params.id},function(err,result){
			
				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					console.log('user blogs  removed------');
					
					}


			});
//end blogmodel find 

			userpModel.remove({'userName':req.params.id},function(err,result){
			
				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					console.log('user removed------',result);
					res.redirect('/blogs/userlogin');
					}


			});
			//end of user model

				
		   
		});







	



}//end app 