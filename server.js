var mongoose = require("mongoose");
var fs = require('fs');
var express = require('express');
var app = express();
var config = require('config');
var autoIncrement = require('mongoose-auto-increment')
var port = process.env.PORT || 8080; // set our port

// Bootstrap routes
var router = express.Router();
var path = require('path');
//connecting to mongoDb
var connect = function() {
	var connection = mongoose.connect('mongodb://localhost/zikher');

	autoIncrement.initialize(connection);

};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

app.use(express.static(__dirname + '/View'));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));


// Bootstrap application settings
require('./config/express')(app);

require('./config/routes')(router);


app.use('/api', router);
app.get('/',function(req,res){
       
     res.sendFile('index.html',{"root": __dirname+'/View'});

});
//Install application
if (process.env.NODE_ENV != 'test') {
	app.listen(port)
	console.log(process.env.NODE_ENV, 'Zikher test Running on : ' + port);
}
module.exports = app;
