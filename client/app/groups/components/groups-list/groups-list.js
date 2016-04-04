define([], function () {
	function GroupsListComponent (articlePostingQueue, groupsStorage) {
		var $ctrl = this;

		$ctrl.groups = [];


		$ctrl.toggleGroupAutoposting = function (group, $event) {
			group.isActive = !group.isActive;

			articlePostingQueue.toggleGroupAutoposting(group.gid);

			$event.stopPropagation();
		};

		function updateGroupsActivationState (groups) {
			groups.forEach(function (group) {
				group.isActive = articlePostingQueue.getAutopostingState(group.gid);
				
			});
		}

		$ctrl.$onInit = function () {

			$ctrl.groupsPromise.then(function (groups) {
				$ctrl.selectedGroup = groups[0];
				updateGroupsActivationState(groups);
			});			
		};

		$ctrl.selectGroup = function (group) {
			$ctrl.onSelect({group: group});
			$ctrl.selectedGroup = group;
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