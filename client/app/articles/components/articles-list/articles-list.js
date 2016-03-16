define([], function () {
	function ArticlesListComponent (articlePostingQueue) {
		var $ctrl = this;

		$ctrl.articles = [];

		$ctrl.addToQueue = function (article) {
			articlePostingQueue.add(article);
		};
	}

	return {
		name: "articlesList",
		config: {
			templateUrl: 'app/articles/components/articles-list/articles-list.html',
			bindings: {
				articles: "<",
				onSelect: "&"
			},
			controller: ArticlesListComponent
		}
	};
});