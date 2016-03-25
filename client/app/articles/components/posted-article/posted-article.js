define([], function () {
	function MyPostedArticleComponent ($interval, articlePostingQueue, articlesContainer, dateTools) {
		var $ctrl = this;

		$ctrl.addToQueue = function () {
			articlesContainer.changeStatus($ctrl.article, 1);

			articlePostingQueue.add($ctrl.article);
		};

		$ctrl.deleteArticle = function () {
			articlesContainer.changeStatus($ctrl.article, 3);
		};

		function checkExpirationState () {
			// TODO: add logic to disable timer
			// if there is no articles or all expired

			var now = (new Date()).valueOf();

			// Displaying on UI
			$ctrl.article.willExpireIn = $ctrl.article.scheduledPostDate - now;

			if ($ctrl.article.isExpired) {
				$interval.cancel(expirationInterval);
				return;
			}

			if ($ctrl.article.scheduledPostDate <= now ) {
				$ctrl.article.isExpired = true;
				$interval.cancel(expirationInterval);
			}
		}

		$ctrl.$onInit = function () {
			checkExpirationState();
		};

		var expirationInterval = $interval(checkExpirationState, 1000);
	}

	return {
		name: "myPostedArticle",
		config: {
			templateUrl: 'app/articles/components/posted-article/posted-article.html',
			bindings: {
				article: "<"
			},
			controller: MyPostedArticleComponent
		}
	};
});