define([
	'../groups/groups-module',
	'main/services/date-tools',
	'main/components/vk-app/vk-app',
	'main/components/my-tabs/my-tabs',
	'main/components/my-pane/my-pane',
	'main/components/time-picker/time-picker',
	'../filters/filters-module',
	'../constants/constants-module'
], function (
		groups, 
		dateToolsService, 
		vkAppComponent, 
		myTabsComponent, 
		myPaneComponents, 
		timePickerComponent, 
		filters, 
		constants
	) {
	var moduleName = 'app';

	angular
		.module(moduleName, [
			'ngComponentRouter',
			'ngMaterial', 
			'ngAnimate', 
			'ngAria', 
			'ngMessages', 
			groups, 
			filters, 
			constants
		])
		.service(dateToolsService.name, dateToolsService.fn)
		.component(vkAppComponent.name, vkAppComponent.config)
		.component(myTabsComponent.name, myTabsComponent.config)
		.component(myPaneComponents.name, myPaneComponents.config)
		.component(timePickerComponent.name, timePickerComponent.config)
		.value('$routerRootComponent', vkAppComponent.name)
		.config(function($locationProvider) {
		  	$locationProvider.html5Mode(true);
		});

	return moduleName;
});