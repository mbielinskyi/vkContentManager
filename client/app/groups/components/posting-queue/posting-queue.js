define([], function () {
	return {
		name: "postingQueue",

		config: {
			templateUrl: 'app/groups/components/posting-queue/posting-queue.html',
			bindings: {
				articles: "<"
			},
			controller: PostingQueueComponent
		}
	};

	function PostingQueueComponent (articlePostingQueue, articlesContainer, articlePoster) {
		var $ctrl = this;

		$ctrl.articles = [];

		$ctrl.log = function () {
			console.dir($ctrl.articles);
		};


		// sending article to poster after it has become expired
		articlePostingQueue.on("articlePosted", function (article) {
			article.postedOn = new Date();
			articlesContainer.changeStatus(article, 2);
		});

	}
});
