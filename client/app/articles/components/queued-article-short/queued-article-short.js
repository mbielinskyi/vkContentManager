define([], function () {
	function MyQueuedArticleComponent ($interval, articlePostingQueue, articlesContainer, dateTools) {
		var $ctrl = this;
		var expirationInterval;

		$ctrl.removeFromQueue = function () {
			$ctrl.article.status = 0;
			articlesContainer.update($ctrl.article);
		};

		$ctrl.postNow = function () {
			// remove from queue service
			articlePostingQueue.remove($ctrl.article);
			//TODO

			//move to article-poster service
			articlePoster.add($ctrl.article);
			//TODO
		};

		function checkExpirationState () {
			// TODO: add logic to disable timer
			// if there is no articles or all expired

			var now = (new Date()).valueOf();

			// Adding new property to Article model (is displayed on UI)
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


		checkExpirationState();
		expirationInterval = $interval(checkExpirationState, 1000);
	}

	return {
		name: "myQueuedArticleShort",
		config: {
			templateUrl: 'app/articles/components/queued-article-short/queued-article-short.html',
			bindings: {
				article: "<"
			},
			controller: MyQueuedArticleComponent
		}
	};
});