define([], function () {
	return {
		name: "postingQueue",

		config: {
			templateUrl: 'app/articles/components/posting-queue/posting-queue.html',
			bindings: {
				articles: "<"
			},
			controller: PostingQueueComponent
		}
	};

	function PostingQueueComponent (articlePostingQueue, articlesContainer, articlePoster) {
		var $ctrl = this;

		$ctrl.activated = false;

		$ctrl.articles = [];

		articlesContainer.query().then(
			function (articles)  {
				$ctrl.articles = articles;
				return articles;
			}
		);

		// sending article to poster after it has expired
		// articlePostingQueue.on("articlePosted", function (article) {
		// 	article.postedOn = new Date();
		// 	articlesContainer.changeStatus(article, 2);
		// });

	}
});
