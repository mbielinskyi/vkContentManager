vkApp.modules.main.controller("ContentController", 
	["$scope", "vkAPI", "$location", "$http", 
	function ($scope, vkAPI, $location, $http) {
		var url = "http://localhost:3000/test";
		$scope.content = "";
		$scope.sentSuccessfully = false;

		$scope.submit = function () {
			$http.post(url, {message: $scope.content.text}).then(function (r) {
				$scope.success = r.data.response;
				console.log(r);
			});

			//vkAPI.postToUserWall($scope);
			// var url = "https://api.vk.com/method/wall.post?owner_id=6718249";

			// $http.get(url, {headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}}).then(function (r) {
			// 	var resp = r;
			// });
		};
	}
]);