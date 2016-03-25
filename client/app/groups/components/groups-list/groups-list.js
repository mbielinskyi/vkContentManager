define([], function () {
	function GroupsListComponent (articlePostingQueue, groupsStorage) {
		var $ctrl = this;

		$ctrl.groups = [];


		$ctrl.toggleGroupAutoposting = function (group) {
			group.isActive = !group.isActive;

			articlePostingQueue.toggleGroupAutoposting(group.gid);
		};

		function updateGroupsActivationState (groups) {
			groups.forEach(function (group) {
				group.isActive = articlePostingQueue.getAutopostingState(group.gid);
				
			});
		}

		$ctrl.$onInit = function () {
			$ctrl.groupsPromise.then(function (groups) {
				updateGroupsActivationState(groups);
			});			
		};
	}

	return {
		name: "groupsList",
		config: {
			templateUrl: 'app/groups/components/groups-list/groups-list.html',
			bindings: {
				'groupsPromise': "=",
				'groups': "<elements",
				'onSelect': "&"
			},
			controller: GroupsListComponent
		}
	};
});