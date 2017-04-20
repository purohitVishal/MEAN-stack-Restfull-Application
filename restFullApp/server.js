var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs= require('mongojs');
var db = mongojs('test',['contactList'])

var app = express(); 

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactList',function(req,res){
	console.log('i received a get request');

	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
 	



});

//here the data will be read by the server coming from the controller as contact object
app.post('/contactList',function(req,res){
	console.log(req.body);

	//we will write the data to the database
db.contactList.insert(req.body,function(err,doc){
	res.json(doc);//this will send the data to the controller again
})

});

app.delete('/contactList/:id',function(req,res){
	var id = req.params.id; // will get the value of the id
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);

	});
});
app.get('/contactList/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});
app.put('/contactList/:id',function(req,res){
	var id = req.params.id;

	 console.log(req.params.id);
	 db.contactList.findAndModify({ query: {_id:mongojs.ObjectId(id)}, 
	 	update: {$set: {name: req.body.name, email: req.body.email, contact: req.body.contact}}, new:true},
	 	function(err,doc){
	 		res.json(doc);
	 	});
})

app.listen(3000,function(){
	console.log('server started on port 3000');
})