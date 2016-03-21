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

		$ctrl.removeFromQueue = function (article) {
			//change status to 0
			articlesContainer.changeStatus(article, 0);

			// remove from queue service
			articlePostingQueue.remove(article);
			// TODO
		};

		$ctrl.postNow = function (article) {
			// remove from queue service
			articlePostingQueue.remove(article);
			//TODO

			//move to article-poster service
			articlePoster.add(article);
			//TODO
		};

		articlePostingQueue.on("articlePosted", function (article) {
			article.postedOn = new Date();
			articlesContainer.changeStatus(article, 2);
		});

	}
});
