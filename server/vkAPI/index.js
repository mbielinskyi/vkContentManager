var httpRequest = require("../utils/httpRequest");

var groupId = -116462359;

var myVkId = 6718249;
var token = "8ae373703fb582931b25ebf80d4846a32292d22a3000c8a479d57883094568cccd9aa82246db7e82eec66";
var appId = 5337633;
var vkURL = "https://api.vkontakte.ru/method/";






module.exports = function (appId) {
	this.postOnUserWall = function (message, cb) {
		var ownerId = myVkId;
		var methodName = "wall.post";
		var parameters = [
		    	"owner_id=" + groupId,
		    	"from_group=1",
		    	"message=" + message,
		    	"access_token=" + token
			].join("&");
		var url = vkURL + methodName + "?" + parameters; 

		httpRequest.get(url, function (r) {
			cb(r.response);
		});
	};

	this.getFriends = function (cb) {
		var friendsGet = "friends.get";
		var friendsFields = [   
		        "nickname",         "domain",                       "sex",                  "bdate",
		        "city",             "country",                      "timezone",             "photo_50",
		        "photo_100",        "photo_200_orig",               "has_mobile",           "contacts",
		        "education",        "online",                       "relation",             "last_seen",
		        "status",           "can_write_private_message",    "can_see_all_posts",    "can_post",
		        "universities"
		    ];
		var parameters = [
		    "user_id=" + myVkId,
		    "fields=" + friendsFields.join(","),
		    "access_token=" + token
		].join("&");
		var url = vkURL + friendsGet + "?" + parameters; 

		httpRequest.get(url, function (r) {
			cb(r);
		});
	};

	this.getGroups = function (cb) {
		var methodName = "groups.get";
		var friendsFields = [
			"city", 			"country", 				"place", 				"description",
			"wiki_page", 		"members_count", 		"counters", 			"start_date",
			"finish_date", 		"can_post", 			"can_see_all_posts", 	"activity",
			"status", 			"contacts", 			"links", 				"fixed_post",
			"verified", 		"site", 				"can_create_topic"
		];
		var parameters = [
		    "user_id=" + myVkId,
		    "extended=1",
		    "filter=" + "admin",
		    "fields=" + friendsFields.join(","),
		    "access_token=" + token
		].join("&");
		var url = vkURL + methodName + "?" + parameters; 

		httpRequest.get(url, function (r) {
			cb(r);
		});
	};

	this.requestAccessToken = function (cb) {
		var requestedRights = ["notify", "friends", "photos", "audio", 
			"video", "docs", "notes", "pages", 
			"status", "offers", "questions", "wall", 
			"groups", "email", "notifications",
			"stats", "ads", "market", "offline"].join(",");
		var redirectPage = "https://oauth.vk.com/blank.html";
		var authTokenHostName = "https://oauth.vk.com/authorize?"
		var authParameters = [
			"client_id=" + appId,
			"scope=" + requestedRights,
			"redirect_uri=" + redirectPage,
			"display=page",
			"v=5.45",
			"response_type=token"
		].join("&");
		var authURL = authTokenHostName + authParameters;

		httpRequest.get(authURL, function (r) {
			cb(r);
		});
	}
}