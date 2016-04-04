define([], function () {
	function SavedArticleComponent ($interval, articlePostingQueue, articlesContainer, dateTools) {
		var $ctrl = this;

		$ctrl.addToQueue = function () {
			$ctrl.article.status = 1;

			// updating scheduled date if it has expired
			if ($ctrl.article.scheduledPostDate < (new Date()).valueOf()) {
				$ctrl.article.scheduledPostDate = (new Date()).valueOf() + $ctrl.article.delay;
				$ctrl.article.isExpired = false;
			}

			articlesContainer.update($ctrl.article);

			// this should be done over server request
			// articlePostingQueue.add($ctrl.article);

			// 1. request server to update status to 1
			// 2. upon response update article with new status
		};

		// this one should delegate deleting action to group details
		// instead of simply changing article status
		$ctrl.deleteArticle = function () {
			articlesContainer.delete($ctrl.article);
			// articlesContainer.changeStatus($ctrl.article, 3);
		};

		$ctrl.edit = function () {};

		// function checkExpirationState () {
		// 	// TODO: add logic to disable timer
		// 	// if there is no articles or all expired

		// 	var now = (new Date()).valueOf();

		// 	// Displaying on UI
		// 	$ctrl.article.willExpireIn = $ctrl.article.scheduledPostDate - now;

		// 	if ($ctrl.article.isExpired) {
		// 		$interval.cancel(expirationInterval);
		// 		return;
		// 	}

		// 	if ($ctrl.article.scheduledPostDate <= now ) {
		// 		$ctrl.article.isExpired = true;
		// 		$interval.cancel(expirationInterval);
		// 	}
		// }

		// $ctrl.$onInit = function () {
		// 	checkExpirationState();
		// };

		// var expirationInterval = $interval(checkExpirationState, 1000);
	}

	return {
		name: "mySavedArticle",
		config: {
			templateUrl: 'app/articles/components/saved-article/saved-article.html',
			bindings: {
				article: "<"
			},
			controller: SavedArticleComponent
		}
	};
});