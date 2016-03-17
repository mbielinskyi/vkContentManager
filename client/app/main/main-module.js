define([
	'../groups/groups-module',
	'main/components/vk-app/vk-app',
	'main/components/my-tabs/my-tabs',
	'main/components/my-pane/my-pane',
], function (groups, vkAppComponent, myTabsComponent, myPaneComponents) {
	var moduleName = 'app';

	angular
		.module(moduleName, [groups, 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages'])
		.component(vkAppComponent.name, vkAppComponent.config)
		.component(myTabsComponent.name, myTabsComponent.config)
		.component(myPaneComponents.name, myPaneComponents.config)
		.filter('millSecondsToTimeString', function() {
			return function(millseconds) {
			    var seconds = Math.floor(millseconds / 1000);
			    var days = Math.floor(seconds / 86400);
			    var hours = Math.floor((seconds % 86400) / 3600);
			    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
			    var timeString = '';
			    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
				timeString += ("00" + hours).substr(-2) + ":";
				timeString += ("00" + minutes).substr(-2) + ":";
				timeString += ("00" + seconds).substr(-2);
			    return timeString;
			};
		});

	return moduleName;
});