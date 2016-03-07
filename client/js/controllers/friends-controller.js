vkApp.modules.main.controller("FriendsController", 
	["$scope", "vkAPI", "$location", "$http", 
	function ($scope, vkAPI, $location, $http) {
		var url = "http://localhost:3000/get-friends";

		$scope.friends = [];

		$http.get(url).then(function (r) {
			$scope.friends = r.data.response;
		});
	}
]);