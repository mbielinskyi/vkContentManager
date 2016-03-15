vkApp.modules.main.factory("contentItems", ["$resource", function ($resource) {
	return $resource(
		'content-items', 
		{}, // url params
		{
	    	query: {
	    		method:'GET'
	    	}
		}
	);
}]);