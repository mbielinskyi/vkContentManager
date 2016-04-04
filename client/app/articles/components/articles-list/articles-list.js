define([], function () {
	function ArticlesListComponent ($interval, articlePostingQueue, articlesContainer, groupsStorage, Constants) {
		var $ctrl = this;
		$ctrl.columns = 2;
		$ctrl.articles = [];
		$ctrl.statuses = Constants.STATUSES;

		$ctrl.filters = {
			gid: "",
			status: "",
			hidePosted: true
		};
		articlesContainer.query().then(
			function (articles)  {
				$ctrl.articles = articles;
				return articles;
			}
		);

		$ctrl.loadGroups = function () {
			return groupsStorage.query().then(function (data) {
				$ctrl.groups = data;
			});
		};
	}

	return {
		name: "myArticlesList",
		config: {
			templateUrl: 'app/articles/components/articles-list/articles-list.html',
			bindings: {
				articles: "<",
				columns: "<"
			},
			controller: ArticlesListComponent
		}
	};
});