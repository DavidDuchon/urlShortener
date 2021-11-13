const express = require('express');
const router  = express.Router();
const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function addUrl(url){
	if (url.length === 0 || !(url.startsWith('https://') || url.startsWith('http://'))){
		throw new Error('Bad URL has been entered');
	}
	
	await client.connect();

	const database = client.db('url');

	const indexDocument = await database.collection('ID').findOne({index:{$exists:true}});
	
	const id = indexDocument.index ;
	const shortenedUrl = `http://localhost:3000/api/getUrl/${id}`;
	

	await database.collection('ID').insertOne(
		{
			originalUrl:url,
			urlID:id,
			shortenedUrl:shortenedUrl
		});

	await database.collection('ID').updateOne({index:{$exists:true}},{$inc:{index:1}});
	await  client.close();

	return shortenedUrl;

}

async function getUrl(id){

	await client.connect();

	const database = client.db('url');

	const urlDocument = await database.collection('ID').findOne({urlID:{$eq:id}});

	if (!urlDocument){
		throw new Error('Could not find shortened URL');
	}
	await client.close();

	return urlDocument.originalUrl;
}
	

router.use(express.json());

router.post('/addUrl',function(req,res,next){
	var body = req.body;

	addUrl(body.url).then((shortenedUrl) => {
		body.shortenedUrl = shortenedUrl;
		body.errorText = '';
		res.json(body);
		})
	.catch(next);
});

router.get('/getUrl/:id',function(req,res,next){
	const id = parseInt(req.params.id);

	getUrl(id).then((url) => {
		res.redirect(302,url);
	}).catch(next);
});

module.exports = router;
