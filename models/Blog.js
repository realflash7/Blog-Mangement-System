// this a model

var mongoose = require('mongoose');

// schema is the design of your database or how your data should be stored
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	
	title 				: {type:String,default:''},
	subtitle			: {type:String,default:''},
	blogBody			: {type:String,default:''},
	numberOfComments 	: {type:Number,default:0},
	comments 			: [],
	creationDate 		: {type:Date,default:''},
	lastModified 		: {type:Date,default:''},
	author				: {type:String,default:''}
	
	  
	
});

mongoose.model('Blog', blogSchema);
var schma= mongoose.Schema;

var userpassSchema = new schma({

	userName			: {type:String},
	passWord			: {type:String}

});

mongoose.model('Userp', userpassSchema);

