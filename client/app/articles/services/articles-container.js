define([], function () {
	return {
		name: "articlesContainer",

		fn: function ArticlesService ($q, $http) {
			var subscriptions= {
				articleAdded: []
			}


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

				query: function (groupId) {
					var deffered = $q.defer();

					$http.get("http://localhost:3000/content-items").then(
						function (r) {
							deffered.resolve(r.data);
						},
						function (error) {
							deffered.reject(error);
						}
					);	

					return deffered.promise;		
				},

				add: function (article) {
					this.publish("articleAdded", article);
				}
			};	
		}
	};
});