define([], function () {
	return {
		name: "groupsStorage",

		fn: function GroupsService ($q, $http, articlesContainer) {
			var subscriptions= {
				update: []
			};
			var pendingGroupsDeffered;
			var groupsCache = [];
			// it should combine Groups date recieved from VK 
			// with data stored in DB (articles, queue, history)
			// in one chunk of data
			function combineGroupWithArticle (groups, articles) {
				return groups.map(function (group) {
					group.articles = articles.filter(function (article) {
						return article.ownerId === -group.gid;
					});

					return group;
				});
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
				query: function () {
					if (!pendingGroupsDeffered) {
						pendingGroupsDeffered = $q.defer();

						$http.get("http://localhost:3000/get-groups").then(
							function (r) {
								var data = r.data.response;
								var groups = data.slice(1, data.length);

								articlesContainer.query().then(function (articles) {
									//perform data combination actions
									var combinedGroups = groupsCache = combineGroupWithArticle(groups, articles);

									pendingGroupsDeffered.resolve(combinedGroups);
									pendingGroupsDeffered = undefined;
								});
							},
							function (error) {
								pendingGroupsDeffered.reject(error);
								pendingGroupsDeffered = undefined;
							}
						);							
					}

					return pendingGroupsDeffered.promise;
				},

				addArticleToGroup: function (article, group) {
					groupsCache.forEach(function (storedGroup) {
						if (storedGroup === group) {
							storedGroup.articles.push(article);
						}
					});

					articlesContainer.add(article);
				}
			};	
		}
	};
});