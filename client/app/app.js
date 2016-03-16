/*global require*/
'use strict';

require([
	'angular'
], function (angular) {
	require([
		'main/main-module'
	], function (app) {
		angular.bootstrap(document, [app]);			
	});	
});