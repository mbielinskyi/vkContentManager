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
	res.send(contentItemsMock);
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

router.get('/langs', function (req, res) {
	var langs = [
			{
				name: "JavaScript",
				rating: 5,
				description: "Main language for web developers around the world",
				logo: "img/js.png"
			},
			{
				name: "C#",
				rating: 4,
				description: "Seems like someone use it to write some backend magic.",
				logo: "img/csharp.png"
			},
			{
				name: "C++",
				rating: 3,
				description: "Heart of Windows and many more. Don't mess up with it unless you are a guy with beard and sweater",
				logo: "img/cplusplus.png"
			},
			{
				name: "Java",
				rating: 4,
				description: "Write once, use anywhere\" - they said.",
				logo: "img/java.png"
			},
			{
				name: "SmallTalk",
				rating: 2,
				description: "OOP's father. Dead by now.",
				logo: "img/js.png"
			}
		];

		res.send(JSON.stringify(langs));
});
	
	function getCustomDelay () {
		var delay = 100000;
		var nowUnix = (new Date()).valueOf();
		var randDelay = Math.floor(Math.random() * delay);

		return nowUnix + randDelay;
	}

	var contentItemsMock = [
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 1",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 2",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 3",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -116462359,
			delay: 10000,
			text: "Some text 4",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 5",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 6",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		},
		{
			ownerId: -51880934,
			delay: 10000,
			text: "Some text 7",
			author: "Maksim Bielinskyi",
			creationDate: (new Date()).valueOf(),
			scheduledPostDate: getCustomDelay(),
			isExpired: false
		}	
	];

module.exports = router;