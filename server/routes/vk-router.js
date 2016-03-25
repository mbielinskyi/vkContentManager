var express = require('express'),
	router = express.Router();

//guess new better name later
var vkAPIConstructor = require("vk-api");
var vkAPI = new vkAPIConstructor();


router.post('/post-to-wall', function(req, res, next) {
	var message = req.body.message;
	vkAPI.postOnWall(message, function (r) {
		res.send(r);
	});
});

router.get('/content-items', function (req, res) {
	res.send(articles);
});

/* GET home page. */
router.post('/login', function(req, res, next) {
	//creating new LoginPage instance
	vk.login(req, res);
});


/* GET home page. */
router.get('/logout', function(req, res, next) {
	//creating new LoginPage instance
	vk.logout(req, res);
});

/* GET home page. */
router.get('/get-login-status', function(req, res, next) {
	//creating new LoginPage instance
	vk.checkLoginState(req, res);
});

/* GET home page. */
router.get('/get-friends', function(req, res, next) {
	vkAPI.getFriends(function (data) {
		res.send(data.replace(/\\\//g, "\/"));
	});
});

router.get('/get-groups', function(req, res, next) {
	vkAPI.getGroups(function (data) {
		res.send(data.replace(/\\\//g, "\/"));
	});
});

module.exports = router;