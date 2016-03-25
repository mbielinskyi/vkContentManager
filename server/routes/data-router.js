var express = require('express'),
	router = express.Router(),
	mongo = require("mongodb");

router.get('/', function(req, res) {
	// articles list should be returned from db
	var MongoClient = mongo.MongoClient;
	var url = "mongodb://localhost:27017/DB";
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log("Error in connection to DB");
		} else {
			console.log("Connected to DB");
			var articlesCollection = db.collection("articles");

			articlesCollection.find({}).toArray(function (err, result) {
				if (err) {
					res.send(err);
				} else {
					res.send(result);
				}

				db.close();
			});
		}
	});
});

router.put('/', function(req, res) {
	// article should be added to db 
	// article should be returned from db
	var MongoClient = mongo.MongoClient;
	var url = "mongodb://localhost:27017/DB";
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log("Error in connection to DB");
		} else {
			console.log("Connected to DB");
			var articlesCollection = db.collection("articles");

			articlesCollection.insert([req.body],function (err, result) {
				if (err) {
					res.send(err);
				} else {
					res.send(result);
				}

				db.close();
			});
		}
	});

});

router.put('/:id', function(req, res) {
	// article should be updated to db 
	var MongoClient = mongo.MongoClient;
	var url = "mongodb://localhost:27017/DB";
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log("Error in connection to DB");
		} else {
			console.log("Connected to DB");
			var articlesCollection = db.collection("articles");
			var _id = mongo.ObjectID.createFromHexString(req.params.id);

			articlesCollection.update(
				{_id:_id},
				{$set: [req.body]},
				{safe: true},
				function (err, result) {
					if (err) {
						res.send(err);
					} else {
						res.send(result);
					}

					db.close();
				}
			);
		}
	});
});

router.delete('/:id', function(req, res) {
	// articles should be removed from db
	var MongoClient = mongo.MongoClient;
	var url = "mongodb://localhost:27017/DB";
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log("Error in connection to DB");
		} else {
			console.log("Connected to DB");
			var articlesCollection = db.collection("articles");
			var _id = mongo.ObjectID.createFromHexString(req.params.id);

			articlesCollection.update(
				{_id:_id},
				{$set: {status: 3}},
				{safe: true},
				function (err, result) {
					if (err) {
						res.send(err);
					} else {
						res.send(result);
					}

					db.close();
				}
			);
		}
	});

});

module.exports = router;