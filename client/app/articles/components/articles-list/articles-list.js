define([], function () {
	function ArticlesListComponent ($interval, articlePostingQueue, articlesContainer) {
		var $ctrl = this;
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