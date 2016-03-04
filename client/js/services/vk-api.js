angular.module("vkAPI", [])

.factory("vkAPI", ["$rootScope", function ($rootScope) {
	var API = {},
		friendsFields = [	
			"nickname", 		"domain", 						"sex", 					"bdate",
			"city", 			"country", 						"timezone", 			"photo_50",
			"photo_100", 		"photo_200_orig", 				"has_mobile", 			"contacts",
			"education", 		"online", 						"relation", 			"last_seen",
			"status", 			"can_write_private_message", 	"can_see_all_posts", 	"can_post",
			"universities"
		],
		groupsFields = [
			"city", 			"country", 						"place", 				"description",
			"wiki_page", 		"members_count", 				"counters", 			"start_date",
			"finish_date", 		"can_post", 					"can_see_all_posts", 	"activity",
			"status", 			"contacts", 					"links", 				"fixed_post",
			"verified", 		"site", 						"can_create_topic"
		],
		userId = 6718249;

	API.getFriends = function (userId, $scope) {
		VK.Api.call('friends.get', {user_id: userId, order: "name", fields: friendsFields.join(",")}, function(r) {
			$scope.$apply(function() {
			  	if(r.response) { 
			  		$scope.friends = r.response;
			  	} 
			}, r);		  	
		}); 
	};

	API.getGroups = function (userId, $scope) {
		VK.Api.call('groups.get', {user_id: userId, extended: 1, filter: "admin"}, function(r) {
			$scope.$apply(function() {
			  	if(r.response) { 
			  		$scope.groups = r.response;
			  	} 
			}, r);

		}); 
	};


	API.getUserIdByAlias = function (userAlias, $scope) {
		VK.Api.call('utils.resolveScreenName', {screen_name: userAlias}, function(r) {
			$scope.$apply(function() {
			  	if(r.response) { 
			  		$scope.userId = r.response.object_id;
			  		$rootScope.userId = r.response.object_id;
			  		userId = r.response.object_id;
			  	}
			}, r);			  	 
		}); 
	}

	API.postToUserWall = function ($scope) {
		VK.Api.call('wall.post', {owner_id: userId, message: $scope.content.text}, function(r) {
			$scope.$apply(function() {
			  	if(r.response) { 
			  		var t = r;
			  	}
			}, r);			  	 
		}); 
	};



	return API;
}]);