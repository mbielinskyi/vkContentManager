/*global require*/
'use strict';

require([

], function () {
	require([
		'main/main-module'
	], function (app) {
		angular.bootstrap(document, [app]);			
	});	
});