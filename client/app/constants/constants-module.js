define([
	'constants/services/constants.storage'
], function (storage) {
	var moduleName = 'myConstants';
	
	angular.module(moduleName, [])
		.service(storage.name, storage.fn);


	return moduleName;
});