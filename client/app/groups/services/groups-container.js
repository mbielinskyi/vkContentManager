define([], function () {
	return {
		name: "groupsStorage",

		fn: function GroupsService ($q, $http, articlesContainer) {
			var subscriptions= {
				update: []
			};
			var groupsRequestUrl = "http://localhost:3000/vk-api/get-groups";
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

						$http.get(groupsRequestUrl).then(
							function (r) {
								var data = r.data.response;
								var groupsCache = data.slice(1, data.length);

								pendingGroupsDeffered.resolve(groupsCache);
								pendingGroupsDeffered = undefined;
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
							article.ownerId = $ctrl.selectedGroup.gid * -1;
							storedGroup.articles.push(article);
						}
					});
				},

				getById: function (id) {
					if (groupsCache.length) {
						return groupsCache.filter(function (group) {
							return group.gid === -id;
						})[0];
					}
				}
			};	
		}
	};
});