define([], function () {
	return {
		name: "postingHistory",

		config: {
			templateUrl: 'app/groups/components/posting-history/posting-history.html',
			bindings: {
				articles: "<"
			},
			controller: PostingHistoryComponent
		}
	};

	function PostingHistoryComponent (articlePostingQueue, articlesContainer, articlePoster) {
		var $ctrl = this;

		$ctrl.sortBy = "date";

		$ctrl.sortingTypes = [
			{
				name: "from New to Old",
				value: "-postedOn"
			},
			{
				name: "from Old to New",
				value: "postedOn"
			},
			{
				name: "by Content",
				value: "text"
			},
			{
				name: "by Author",
				value: "author"
			}
		];

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
			articlesContainer.changeStatus(article, 2);
		});

	}
});
