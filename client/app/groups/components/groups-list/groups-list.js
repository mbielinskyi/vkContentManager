define([], function () {
	function GroupsListComponent () {
		var $ctrl = this;

		$ctrl.elements = [];

		// get list of groups for which auto-posting is turned ON
        // calculate and start countdown timer for each of them
        // display status for each group and count of articles pending for posting
	}

	return {
		name: "groupsList",
		config: {
			templateUrl: 'app/groups/components/groups-list/groups-list.html',
			bindings: {
				elements: "<",
				onSelect: "&"
			},
			controller: GroupsListComponent
		}
	};
});