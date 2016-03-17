define([], function () {
	return {
		name: "app",
		config: {
			templateUrl: 'app/main/components/vk-app/vk-app.html',
			bindings: {},
			controller: AppComponent
		}
	};

	function AppComponent ($q, groupsContainer, articlesContainer) {
		var $ctrl = this;

		$ctrl.groups = [];
		$ctrl.groupsDeffered = $q.defer();
		$ctrl.groupsPromise = $ctrl.groupsDeffered.promise;

		articlesContainer.on("articleAdded", function (article) {
			$ctrl.articles.push(article);

			// updating articles list
			$ctrl.selectedArticles.push(article);
		});

		$ctrl.changeSelectedGroup = function (group) {
			$ctrl.selectedGroup = group;
			$ctrl.selectedArticles = $ctrl.articles.filter(function (el) {
				return el.ownerId === -group.gid;
			});
		};

		groupsContainer.query().then(function (groups) {			
			$ctrl.groupsDeffered.resolve(groups);

			$ctrl.groupsPromise.then(function (groups) {
				$ctrl.groups = groups;
				$ctrl.selectedGroup = $ctrl.groups[0];

				return groups;
			});

			articlesContainer.query().then(function (articles) {
				$ctrl.articles = articles;

				$ctrl.changeSelectedGroup($ctrl.selectedGroup);
			});
		});	
	}
});

