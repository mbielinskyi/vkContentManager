define([], function () {
	return {
		name: "articlesContainer",

		fn: function ArticlesContainerService ($q, $http) {
			var subscriptions= {
				articleAdded: []
			};
			var pendingArticlesDeffered;

			// all articles of all groups
			var cache = [];

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
					if (!pendingArticlesDeffered) {
						pendingArticlesDeffered = $q.defer();

						$http.get("http://localhost:3000/rest/articles").then(
							function (r) {
								cache = r.data;
								pendingArticlesDeffered.resolve(cache);
								pendingArticlesDeffered = undefined;
							},
							function (error) {
								pendingArticlesDeffered.reject(error);
								pendingArticlesDeffered = undefined;
							}
						);	
					}		

					return pendingArticlesDeffered.promise;
				},

				add: function (article) {
					var saveDeffered = $q.defer();
					// perform server call
					$http.put("http://localhost:3000/rest/articles", article).then(
						function (r) {
							saveDeffered.resolve(r.data);
							saveDeffered = undefined;
							cache.push(r.data.ops[0]);
						},
						function (error) {
							saveDeffered.reject(error);
							saveDeffered = undefined;
						}
					);

					return saveDeffered.promise;
				},

				update: function (article) {
					var saveDeffered = $q.defer();
					// perform server call


					$http.put("http://localhost:3000/rest/articles/" + article._id, article).then(
						function (r) {
							saveDeffered.resolve(r.data);
							saveDeffered = undefined;
							// cache.push(r.data.ops[0]);
						},
						function (error) {
							saveDeffered.reject(error);
							saveDeffered = undefined;
						}
					);

					return saveDeffered.promise;					
				},

				delete: function (article) {
					// perform server call
					var deleteDeffered = $q.defer();

					$http.delete("http://localhost:3000/rest/articles/" + article._id, article).then(
						function (r) {
							deleteDeffered.resolve(r.data);
							deleteDeffered = undefined;

							// remove from cache
							cache.forEach(function (storedArticle, i) {
								if (storedArticle._id === article._id) {
									cache.splice(cache.indexOf(article), 1);
								}
							});
						},
						function (error) {
							deleteDeffered.reject(error);
							deleteDeffered = undefined;
						}
					);

					return deleteDeffered.promise;

				},
			};	
		}
	};
});