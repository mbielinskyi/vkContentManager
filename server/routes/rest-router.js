var express = require('express'),
	router = express.Router(),
	articles = require("./articles-router");

router.use('/articles', articles);

module.exports = router;