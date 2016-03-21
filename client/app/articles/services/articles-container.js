

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

						$http.get("http://localhost:3000/content-items").then(
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
					// perform server call

					cache.push(article);

					//this.publish("articleAdded", article);
				},

				delete: function (article) {
					cache.forEach(function (storedArticle) {
						if (article === storedArticle) {
							// do server call
							cache.splice(cache.indexOf(article), 1);
						}
					});
				},
			};	
		}
	};
});