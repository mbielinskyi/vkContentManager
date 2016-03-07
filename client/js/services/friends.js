vkApp.modules.main.factory("friends", ["$resource", function ($resource) {
	return $resource(
		'get-friends', 
		{}, // url params
		{
	    	query: {
	    		method:'GET'
	    	}
		}
	);
}]);