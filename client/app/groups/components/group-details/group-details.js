define([], function () {
	function GroupDetailsComponent (articlesContainer, groupsStorage, dateTools) {
		var $ctrl = this;

		$ctrl.articles = [];	
		$ctrl.selectedGroup = {};

		// passed to new-content component
		// adds new article to articles collection
		// does nothing with posting
		$ctrl.addArticle = function (article) {
			article.ownerId = $ctrl.selectedGroup.gid * -1;
			article.creationDate = dateTools.getNow().ms;


			// ssaving to server
			// adding to collection on view upon server request
			articlesContainer.add(article).then(
				function (response) {
					groupsStorage.addArticleToGroup(article, $ctrl.selectedGroup);
				},
				function (err) {
					console.log("Ooops! Seems like article was not saved")
				}
			);
		};
	}

	return {
		name: "groupDetails",
		config: {
			templateUrl: 'app/groups/components/group-details/group-details.html',
			bindings: {
				selectedGroup: "<"
			},
			controller: GroupDetailsComponent
		}
	};


});

