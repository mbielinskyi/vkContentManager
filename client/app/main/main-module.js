define([
	'angular',
	'../groups/groups-module',
	'main/components/vk-app/vk-app',
	'main/components/my-tabs/my-tabs',
	'main/components/my-pane/my-pane',
], function (angular, groups, vkAppComponent, myTabsComponent, myPaneComponents) {
	var moduleName = 'app';

	angular
		.module(moduleName, [groups])
		.component(vkAppComponent.name, vkAppComponent.config)
		.component(myTabsComponent.name, myTabsComponent.config)
		.component(myPaneComponents.name, myPaneComponents.config);

	return moduleName;
});