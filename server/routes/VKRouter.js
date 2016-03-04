var express = require('express'),
	router = express.Router();
	//vk = require("../VKPageObject");

//guess new better name later
var vkAPIConstructor = require("../vkAPI");
var vkAPI = new vkAPIConstructor();
/* GET home page. */
router.get('/test', function(req, res, next) {
	vkAPI.postOnUserWall(function (r) {
		res.send(r);
	});
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
		res.send(data);
	});
});


module.exports = router;