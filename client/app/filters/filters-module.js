define([
	'filters/filters.even',
	'filters/filters.odd',
	'filters/filters.ms-to-time'
], function (even, odd, msToTime) {
	var moduleName = 'filters';

	angular.module(moduleName, [])	
		.filter(even.name, even.fn)
		.filter(odd.name, odd.fn)
		.filter(msToTime.name, msToTime.fn);

	return moduleName;
});