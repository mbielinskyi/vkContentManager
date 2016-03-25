

define([], function () {
	return {
		name: "articlesContainer",

		fn: function ArticlesService ($q, $http) {
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

						$http.get("http://localhost:3000/articles").then(
							function (r) {
								pendingArticlesDeffered.resolve(r.data);
								pendingArticlesDeffered = undefined;
								cache = r.data;

							},
							function (error) {
								pendingArticlesDeffered.reject(error);
								pendingArticlesDeffered = undefined;
							}
						);	
					}		

					return pendingArticlesDeffered.promise;
				},

				changeStatus: function (article, status) {
					cache.forEach(function (storedArticle) {
						if (article === storedArticle) {
							storedArticle.status = status;
						}
					});
				},

				add: function (article, selectedGroup) {
					var saveDeffered = $q.defer();
					// perform server call
					$http.put("http://localhost:3000/articles", article).then(
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

				delete: function (article) {
					// perform server call
					var deleteDeffered = $q.defer();

					$http.delete("http://localhost:3000/articles/" + article._id, article).then(
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