var httpRequest = require("../utils/httpRequest");

var myVkId = 6718249;
var token = "3a5435e7f7af1bacf093c6206454f2cb7faf3b5ca32c889a58f7ce639684addcf0fc13e8bdc8b9ed835d9";
var appId = "5329876";
var vkURL = "https://api.vk.com/method/";






module.exports = function (appId) {
	this.postOnUserWall = function () {
		var ownerId = myVkId;
		var methodName = "wall.post";
		var parameters = [
		    	"owner_id=" + myVkId,
		    	"message=" + "hello from node.js",
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