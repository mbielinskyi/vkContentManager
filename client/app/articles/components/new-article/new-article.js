define([], function () {
	function NewContentComponent (articlesContainer, dateTools, groupsStorage) {
		var $ctrl = this;
		$ctrl.selectedDate = new Date();
		$ctrl.minDate = new Date();
		$ctrl.service = articlesContainer;
		$ctrl.article = getDefaultArticle();
			console.dir(articlesContainer);
		// TODO: move this to separate service
		function getDefaultArticle () {
			var now  = dateTools.getNow();
			console.dir(articlesContainer);
			return {
				text: "",
				status: 0,
				delay: 0,
				scheduledPostDate: now.ms,
				creationDate: now.ms,
				// author name will be taken from User Account data
				author: "Maksim Bielinskyi"
			};
		}



		// TODO: this method should save article to server
		// using only articleContainer service
		$ctrl.save = function () {
			var now  = dateTools.getNow();

			//$ctrl.onSave({article: $ctrl.article});

			// 1. Add new properties
			$ctrl.article.creationDate = now.ms;
			$ctrl.article.ownerId = $ctrl.group.


			// 2. Save to server
			articlesContainer.add($ctrl.article).then(
				function (response) {
					groupsStorage.addArticleToGroup(article, $ctrl.selectedGroup);
				},
				function (err) {
					console.log("Ooops! Seems like article was not saved")
				}
			);

			// 3. Update view upon request


			$ctrl.article = getDefaultArticle();
		};

		$ctrl.updateDateAttributes = function (dateProperties) {
			$ctrl.article.scheduledPostDate = dateProperties.sheduledDate;
			$ctrl.article.delay = dateProperties.delay;
		};
	}

	return {
		name: "newContent",
		config: {
			templateUrl: 'app/articles/components/new-article/new-article.html',
			bindings: {
				onSave: "&",
				group: "<"
			},
			controller: NewContentComponent
		}
	};
});