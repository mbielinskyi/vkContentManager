vkApp.modules.main.controller("PostingController", 
	["$scope", "groups", "$http", 
	function ($scope, groups, $http) {
		var url = "http://localhost:3000/post-to-wall";
		$scope.selectedGroup = {
			gid: -116462359
		};

		$scope.content = {
			text: "",
			ownerId: $scope.selectedGroup.gid
		};

		$scope.groups = [];

		groups.query().then(function (response) {
			$scope.groups = response;
		});
		

		$scope.sentSuccessfully = false;

		$scope.submit = function () {
			$http.post(url, {message: $scope.content}).then(function (r) {
				$scope.success = r.data.response;
				console.log(r);
			});
		};

		$scope.selectGroup = function (group) {
			$scope.selectedGroup = group;
			$scope.content.ownerId = "-" + group.gid;
		};
	}
]);