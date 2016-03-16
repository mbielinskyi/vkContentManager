define([], function () {
	function GroupDetailsComponent (articlesContainer) {
		var $ctrl = this;

		$ctrl.articles = [];	

		// passed to new-content component
		// adds new article to articles collection
		// does nothing with posting
		$ctrl.addArticle = function (article) {
			article.ownerId = $ctrl.selectedGroup.gid * -1;
			articlesContainer.add(article);
		};
	}

	return {
		name: "groupDetails",
		config: {
			templateUrl: 'app/groups/components/group-details/group-details.html',
			bindings: {
				selectedGroup: "<",
				articles: "<"
			},
			controller: GroupDetailsComponent
		}
	};


});

