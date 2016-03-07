vkApp.modules.main
.controller("GroupsController", ["$scope", "groups", function ($scope, groups) {
	$scope.groups = [];

	groups.query().then(function (response) {
		$scope.groups = response;
	});
}]);