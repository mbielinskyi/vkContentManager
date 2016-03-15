vkApp.modules.groupsModule
	.component("groupsList", {
		templateUrl: 'js/app/groups/components/groupsList/templates/groupDetails.html',
		bindings: {
			selectedGroup: "<"
		},
		controller: GroupDetailsComponent
	});

function GroupDetailsComponent (groups) {
	var $ctrl = this;

	$ctrl.groups = [];

	groups.query().then(function (response) {
		$ctrl.groups = response;
		$ctrl.selectedGroup = $ctrl.groups[0];
	});	
}