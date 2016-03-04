var express = require('express'),
	router = express.Router(),
	vk = require("../VKPageObject");



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
router.get('/get-friends-list', function(req, res, next) {
	//creating new LoginPage instance
	vk.getFriendsList(req, res);
});


module.exports = router;