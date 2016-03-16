define([
	'angular',
	'../articles/articles-module',
	'groups/services/groups-container',
	'groups/components/group-details/group-details',
	'groups/components/groups-list/groups-list',
], function (angular, articles, groupsContainer, groupDetailsComponent, groupsListComponent) {
	var moduleName = 'groups';
	
	angular
		.module(moduleName, [articles])
		.service(groupsContainer.name, groupsContainer.fn)
		.component(groupDetailsComponent.name, groupDetailsComponent.config)
		.component(groupsListComponent.name, groupsListComponent.config);

	return moduleName;
});