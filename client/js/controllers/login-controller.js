vkApp.modules.main.controller("LoginController", 
	["$scope", "vkAutomation", "$location", 
	function ($scope, vkAutomation, $location) {
		$scope.user = {
			login: "380976047987",
			password: "Inspiron11051988"

			// login: "380996864988",
			// password: "11May1988"
		};

		$scope.signIn = function () {
			vkAutomation.logIn($scope);
			$location.path("/");
		};

		$scope.signOut = function () {
			vkAutomation.logOut($scope);
			$location.path("/login");
		};
	}
]);