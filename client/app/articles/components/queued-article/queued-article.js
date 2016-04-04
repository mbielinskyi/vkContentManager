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

		// $ctrl.countdown = dateTools.

		$ctrl.getShortName = function () {
			var ownerName = $ctrl.article.ownerName;
			var ownerNameLength = ownerName.length;
			var maxLength = 16;
			var ownerNameReduced = ownerName.slice(0, maxLength - 3) + "...";

			return (ownerNameLength > 15)? ownerNameReduced: ownerName;
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
		name: "myQueuedArticle",
		config: {
			templateUrl: 'app/articles/components/queued-article/queued-article.html',
			bindings: {
				article: "<"
			},
			controller: MyQueuedArticleComponent
		}
	};
});