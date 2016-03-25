define([
	'../groups/groups-module',
	'main/services/date-tools',
	'main/components/vk-app/vk-app',
	'main/components/my-tabs/my-tabs',
	'main/components/my-pane/my-pane',
	'main/components/time-picker/time-picker',	
], function (groups, dateToolsService, vkAppComponent, myTabsComponent, myPaneComponents, timePickerComponent) {
	var moduleName = 'app';

	angular
		.module(moduleName, [groups, 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages'])
		.service(dateToolsService.name, dateToolsService.fn)
		.component(vkAppComponent.name, vkAppComponent.config)
		.component(myTabsComponent.name, myTabsComponent.config)
		.component(myPaneComponents.name, myPaneComponents.config)
		.component(timePickerComponent.name, timePickerComponent.config)		
		.filter('millSecondsToTimeString', function() {
			return function(millseconds) {
				var SEC_IN_DAY = 86400;
				var SEC_IN_HOUR = 3600;
				var SEC_IN_MIN = 60;
				var MS_IN_SEC = 1000;
			    var seconds = Math.floor(millseconds / MS_IN_SEC);
			    var days = Math.floor(seconds / SEC_IN_DAY);
			    var timeZoneOffset = 0;
			    //var timeZoneOffset = (new Date()).getTimezoneOffset() * SEC_IN_MIN;
			    var hours = Math.floor(((seconds - timeZoneOffset) % SEC_IN_DAY) / SEC_IN_HOUR);
			    var minutes = Math.floor(((seconds % SEC_IN_DAY) % SEC_IN_HOUR) / SEC_IN_MIN);
			    var timeString = '';
			    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
				timeString += ("00" + hours).substr(-2) + ":";
				timeString += ("00" + minutes).substr(-2) + ":";
				timeString += ("00" + seconds % SEC_IN_MIN).substr(-2);
			    return timeString;
			};
		})
		.filter('odd', function () {
			return function (array) {
				if (!array) return array;

				return array.filter(function (el, index) {
					return index %2 === 0;
				});
			};
		}).filter('even', function () {
			return function (array) {
				if (!array) return array;

				return array.filter(function (el, index) {
					return index % 2 !== 0;
				});
			};
		});

	return moduleName;
});


// do timezone offset calc not only if passing new date not date diff coz date diff is all right