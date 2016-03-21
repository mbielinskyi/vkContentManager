define([], function () {
	function GroupDetailsComponent (articlesContainer, groupsStorage) {
		var $ctrl = this;

		$ctrl.articles = [];	
		$ctrl.selectedGroup = {};

		// passed to new-content component
		// adds new article to articles collection
		// does nothing with posting
		$ctrl.addArticle = function (article) {
			article.ownerId = $ctrl.selectedGroup.gid * -1;
			groupsStorage.addArticleToGroup(article, $ctrl.selectedGroup);
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

