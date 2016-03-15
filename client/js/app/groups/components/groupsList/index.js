vkApp.modules.groupsModule
	.component("groupsList", {
		templateUrl: 'js/app/groups/components/groupsList/templates/groupsList.html',
		bindings: {

		},
		controller: GroupsListComponent
	});

function GroupsListComponent (groups) {
	var $ctrl = this;

	$ctrl.groups = [];

	groups.query().then(function (response) {
		$ctrl.groups = response;
	});	
}


function GroupsService ($q, $http) {
	return {
		query: function () {
			var deffered = $q.defer();

			$http.get("http://localhost:3000/get-groups").then(
				function (r) {
					var data = r.data.response;
					
					deffered.resolve(data.slice(1, data.length));
				},
				function (error) {
					deffered.reject(error);
				}
			);	

			return deffered.promise;		
		}
	};
}