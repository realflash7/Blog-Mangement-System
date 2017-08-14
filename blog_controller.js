var mongoose = require('mongoose');

var blogModel = mongoose.model('Blog');


// module.exports is used to export some function out of a file
module.exports.controller = function(app){

	// routes to get data 

	app.get('/blogs/all', function(req, res){

		blogModel.find({},function(err,result){

			if(err){
				console.log(err);
				res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
			}
			else{

				res.send(result);
			}



		}); // end find command 		
	   
	}); // end data function

	
	app.get('/blogs/:id', function(req, res){

		blogModel.findOne({'_id':req.params.id},function(err,result){

			if(err){
				console.log(err);
				res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
								
			}
			else{

				res.send(result);
			}


		}); // end find command 		
	   
	}); // end data function


	// end routes to get data 


	app.post('/blogs/create', function(req, res){
			
			var today = Date.now();
			var newBlog = new blogModel	(

					{

						title			: req.body.title,
						subtitle 		: req.body.subtitle,
						blogBody   		: req.body.blogBody,
						creationDate 	: today,
						author			: {userName:req.body.userName,fullName:req.body.fullName}


					}

			);

			newBlog.save(function(err){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{
					res.send(newBlog);
				}


			});//end save
	   
	}); // end data function


	app.post('/blogs/:id/comment', function(req, res){
			
			// write the code to create a comment 
	   
	}); // end data function


	// end routes to create data 



	//routes to update data 

		app.put('/blogs/:id/edit', function(req, res){
				
			console.log(req.body);
			var options = req.body
			blogModel.update({'_id':req.params.id},options,{multi:true}).exec(function(err,result){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{

					res.send(result);

				}


			});//end blogmodel find 
				
		   
		}); // end put request


		app.put('/blogs/comments/:id/edit', function(req, res){
				
			//write the code yourself
				
		   
		}); // end put request




	//end routes to update the data


	//routes to delete the data


	app.post('/blogs/:id/remove', function(req, res){
				
			
			blogModel.remove({'_id':req.params.id},function(err,result){

				if(err){
					console.log(err);
					res.send({error:true,'errorMessage':err,'userMessage':'Sorry some error occured'});
					
				}
				else{

					res.send(result);

				}


			});//end blogmodel find 
				
		   
		}); // end delete request




	//end routes to delete the data







	



}//end app