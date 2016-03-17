define([], function () {
	return {
		name: "groupsContainer",

		fn: function GroupsService ($q, $http) {
			var subscriptions= {
				update: []
			};

			var pendingGroupsPromise;


			return {				
				on: function (eventName, cb) {
					if (subscriptions[eventName] === undefined) return;

					subscriptions[eventName].push(cb);
				},
				publish: function (eventName) {
					var args = Array.prototype.slice.call(arguments, 1);

					subscriptions[eventName].forEach(function (cb) {
						cb.apply(null, args);
					});
				},
				query: function () {
					var deffered = $q.defer(),
						self = this;

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