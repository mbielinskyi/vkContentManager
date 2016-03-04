vkApp.modules.main.controller(
	"mainController", 
	["$scope", "vkAPI", "vkAutomation", 
	function ($scope, vkAPI, vkAutomation) {
		$scope.friends = [];

		$scope.loginStatusReceived = false;

		$scope.showLogIn = !$scope.isLoggedIn;
		$scope.showLogOut = !!$scope.isLoggedIn;

		$scope.isLoggedIn = vkAutomation.getLoginStatus($scope);

		//$scope.loginStatusReceived = false;

		$scope.getFriendsList = function () {
			vkAPI.getFriends($scope.userId, $scope);
		};
	}]);