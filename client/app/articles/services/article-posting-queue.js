define([], function () {
	return {
		name: "articlePostingQueue",

		fn: function ArticlePostingQueueService ($interval, articlePoster) {
			var activatedGroupsList = [
					-50732577,
					-72099551,
					-51880934,
					-116462359,
					-52776178
				];
			var queue = [
					// {
					// 	ownerId: -50732577,
					// 	scheduledPostDate: (new Date().valueOf() + 10000),
					// 	text: "Русский текст"  
					// },
					// {
					// 	ownerId: -50732577,
					// 	scheduledPostDate: (new Date().valueOf() + 12000),
					// 	text: "some new text to be posted"  
					// },
					// {
					// 	ownerId: -72099551,
					// 	scheduledPostDate: (new Date().valueOf() + 14000),
					// 	text: "some new new text to be posted"  
					// },
					// {
					// 	ownerId: -52776178,
					// 	scheduledPostDate: (new Date().valueOf() + 16000),
					// 	text: "some new new new text to be posted"  
					// },
					// {
					// 	ownerId: -51880934,
					// 	scheduledPostDate: (new Date().valueOf() + 18000),
					// 	text: "some new new new new text to be posted"  
					// },
					// {
					// 	ownerId: -51880934,
					// 	scheduledPostDate: (new Date().valueOf() + 30000),
					// 	text: "some new new new new new text to be posted"  
					// }
				];
			var checkExpiredInterval;

			function checkForExpiredDelays () {
				for (var i = 0; i < queue.length; i++) {
					var shouldBePostedNow = queue[i].scheduledPostDate < (new Date());
					var postingActivated = activatedGroupsList.indexOf(queue[i].ownerId) !== -1;

					if (shouldBePostedNow && postingActivated) {
						 articlePoster.add(queue.splice(i, 1)[0]);
					}
				}

				checkForEmptyQueue();
			}

			function getLaytestScheduledDate (requestedOwnerId) {
				// if queue is empty
				if (queue.length === 0) {
					return (new Date()).valueOf();
				}

				// looking for posts of requested group
				var groupsQueue = queue
					.filter(function (el) {
						return el.ownerId === requestedOwnerId;
					}).map(function (el) {
						return el.scheduledPostDate;
					});


				// if for current group no posts are in queue
				if (groupsQueue.length === 0) {
					return (new Date()).valueOf();
				}

				return Math.max.apply(null, groupsQueue);
			}
			
			function checkForEmptyQueue () {
				if (queue.length === 0) {
					stopChecking();
				} else {
					startChecking();
				}					
			}

			function startChecking () {
				if ( angular.isDefined(checkExpiredInterval)) {
					return;
				}

				checkExpiredInterval = $interval(checkForExpiredDelays, 200);
			}

			function stopChecking () {
				if (angular.isDefined(checkExpiredInterval)) {
        			$interval.cancel(checkExpiredInterval);
        			checkExpiredInterval = undefined;
				}
			}

			// by default we are activating monitoring
			startChecking();

			return {
				add: function (article) {
					article.scheduledPostDate = getLaytestScheduledDate(article.ownerId) + article.delay;
					queue.push(article);

					checkForEmptyQueue();
				},

				toggleGroupAutoposting: function (groupId) {
					var groupIdPosition = activatedGroupsList.indexOf(groupId * -1);

					if (groupIdPosition !== -1) {
						activatedGroupsList.splice(groupIdPosition, 1);
					} else {
						// if there are expired posts
						// for turned off group
						// we should recalculate their scheduled posting date
						// after activating group autoposting
						// taking Now as a departing point
						// incrementing it by Delay
						queue.forEach(function (article) {
							if (article.ownerId === groupId) {
								article.scheduledPostDate = (new Date()).valueOf() + article.delay;
							}
						});

						activatedGroupsList.push(groupId);
					}
				},

				getAutopostingState: function (groupId) {
					return activatedGroupsList.indexOf(groupId * -1) !== -1;
				}
			};	
		}
	};
});