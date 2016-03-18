define([], function () {
	function ArticlesListComponent ($interval, articlePostingQueue) {
		var $ctrl = this;

		$ctrl.articles = [];

		$ctrl.addToQueue = function (article) {
			articlePostingQueue.add(article);
			$ctrl.articles.splice($ctrl.articles.indexOf(article), 1);
		};

		$ctrl.isExpired = function (article) {
			if (article.scheduledPostDate < (new Date()).valueOf()) {
				return "expired";
			} else {
				return new Date(article.scheduledPostDate);
			}
		};

		function checkExpirationState () {
			// TODO: add logic to disable timer

			$ctrl.articles.forEach(function (article) {
				var now = (new Date()).valueOf();
				// for testing
				article.willExpireIn = article.scheduledPostDate - now;

				if (article.isExpired) return;

				if (article.scheduledPostDate <= now ) {
					article.isExpired = true;
				}
			});
		}

		function updateExpireTimer () {

		}

		var expirationInterval = $interval(checkExpirationState, 1000);
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