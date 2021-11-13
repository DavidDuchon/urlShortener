const express = require('express');
const app = express();
const apiRouter = require('./apiRouter.js');
const port = 3000;


app.use(express.static(__dirname + '/../frontend'));

app.use('/api',apiRouter);

app.get('*',function(req,res){
	var options = {
		root:__dirname + "/../frontend",
	};

	console.log("Sending index.html");

	res.sendFile('index.html',options);
});

app.use(function(err,req,res,next){
	var body = req.body;

	console.log('errorText');
	body.errorText = err.message
	console.log(body.errorText);

	res.json(body);
	}
);



app.listen(port,function(){
	console.log(`Listening at localhost:${port}`);
});

