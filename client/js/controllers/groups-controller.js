vkApp.modules.main.controller("GroupsController", 
	["$scope", "vkAPI", "$location", "$http", 
	function ($scope, vkAPI, $location, $http) {
		var url = "http://localhost:3000/get-groups";

		$scope.groups = [];

		$http.get(url).then(function (r) {
			var response = r.data.response;
			$scope.count = response[0];
			$scope.groups = response.slice(1, response.length);
		});
	}
]);