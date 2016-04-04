define([
	'../articles/articles-module',
	'groups/services/groups-container',
	'groups/components/group-details/group-details',
	'groups/components/groups-list/groups-list'
], function (articles, groupsStorage, groupDetailsComponent, groupsListComponent) {
	var moduleName = 'groups';
	
	angular
		.module(moduleName, [articles])
		.service(groupsStorage.name, groupsStorage.fn)
		.component(groupDetailsComponent.name, groupDetailsComponent.config)
		.component(groupsListComponent.name, groupsListComponent.config);
	return moduleName;
});