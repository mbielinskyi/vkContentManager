define([], function () {
	return {
		name: "articlePoster",

		fn: function ArticlePosterService ($interval, $http) {
			var queue = [];
			var postInterval;

			function postArticle () {
				var articleToBePosted = {};

				articleToBePosted = queue.shift();

				$http.post("http://localhost:3000/vk-api/post-to-wall", {message: articleToBePosted})
					.then(function (r) {
						console.log(r);

						// consider adding Posted On date here


					});

				checkForEmptyQueue();
			}

			function checkForEmptyQueue () {
				if (queue.length === 0) {
					stopPosting();
				} else {
					startPosting();
				}					
			}

			function startPosting () {
				if (!angular.isDefined(postInterval)) {
					postInterval = $interval(postArticle, 400);
				}
			}

			function stopPosting () {
				if (angular.isDefined(postInterval)) {
        			$interval.cancel(postInterval);
        			postInterval = undefined;
				}
			}

			return {
				add: function (article) {
					queue.push(article);

					checkForEmptyQueue();
				}
			};	
		}
	};
});