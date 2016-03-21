define([
	'../articles/articles-module',
	'groups/services/groups-container',
	'groups/components/group-details/group-details',
	'groups/components/groups-list/groups-list',
	'groups/components/posting-queue/posting-queue',
	'groups/components/posting-history/posting-history'
], function (articles, groupsStorage, groupDetailsComponent, groupsListComponent, postingQueueComponent, postingHistoryComponent) {
	var moduleName = 'groups';
	
	angular
		.module(moduleName, [articles])
		.service(groupsStorage.name, groupsStorage.fn)
		.component(groupDetailsComponent.name, groupDetailsComponent.config)
		.component(groupsListComponent.name, groupsListComponent.config)
		.component(postingQueueComponent.name, postingQueueComponent.config)
		.component(postingHistoryComponent.name, postingHistoryComponent.config);
	return moduleName;
});