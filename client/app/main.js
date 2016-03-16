/*global require*/
'use strict';

require.config({
	paths: {
		angular: '../lib/angular'
	},
	shim: {
		angular: {
			exports: 'angular'
		}
	},
	deps: ['app']
});
