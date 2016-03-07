vkApp.modules.main.controller("FriendsController", ["$scope", "friends", function ($scope, friends) {
	$scope.friends = friends.query();
}]);