angular.module("vkAutomation", ["vkAPI"])

.factory("vkAutomation", ["vkAPI", "$http", function (vkAPI, $http) {
	var API = {};

	API.getLoginStatus = function ($scope) {
		$http.get("http://localhost:3000/get-login-status").then(
			function (response) {
				$scope.isLoggedIn = response.data !== "";
				$scope.showLogIn = !$scope.isLoggedIn;
				$scope.showLogOut = !!$scope.isLoggedIn;
				
				vkAPI.getUserIdByAlias(response.data, $scope);
			},
			function (error) {
			}
		);
	};

	API.logIn = function ($scope) {
		$http.post("http://localhost:3000/login", $scope.user).then(
			function (response) {
				$scope.isLoggedIn = response.data !== "";
				$scope.showLogIn = !$scope.isLoggedIn;
				$scope.showLogOut = !!$scope.isLoggedIn;

				vkAPI.getUserIdByAlias(response.data, $scope);
			},
			function (error) {
			}
		); 
	};


	API.logOut = function ($scope) {
		$http.get("http://localhost:3000/logout").then(
			function (response) {
				$scope.isLoggedIn = response.data !== "";
				$scope.showLogIn = !$scope.isLoggedIn;
				$scope.showLogOut = !!$scope.isLoggedIn;

			},
			function (error) {
			}
		);
	};

	return API;
}]);