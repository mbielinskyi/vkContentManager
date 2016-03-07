vkApp.modules.main.controller("LanguagesController", 
	["$scope", "$http", 
	function ($scope, $http) {
		$scope.langs = [];

		$http.get("http://localhost:3000/langs").then(function (r) {
			$scope.langs = r.data;
		});

	}
]);