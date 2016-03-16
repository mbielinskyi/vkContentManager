define([], function () {
	return {
		name: "groupsContainer",

		fn: function GroupsService ($q, $http) {
			return {
				query: function () {
					var deffered = $q.defer();

					$http.get("http://localhost:3000/get-groups").then(
						function (r) {
							var data = r.data.response;
							
							deffered.resolve(data.slice(1, data.length));
						},
						function (error) {
							deffered.reject(error);
						}
					);	

					return deffered.promise;		
				}
			};	
		}
	};
});