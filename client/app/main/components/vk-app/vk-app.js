define([], function () {
	return {
		name: "vkApp",
		config: {
			templateUrl: 'app/main/components/vk-app/vk-app.html',
			bindings: {},
			controller: AppComponent,
			$routeConfig: [
		      	{path: '/articles',    name: 'ArticlesList',   component: 'myArticlesList', useAsDefault: true}
		    ]
		}
	};

	function AppComponent ($q, groupsStorage, articlesContainer, articlePostingQueue) {
		var $ctrl = this;

		// $ctrl.groups = [];

		// $ctrl.groupsDeffered = $q.defer();
		// $ctrl.groupsPromise = $ctrl.groupsDeffered.promise;

		// $ctrl.changeSelectedGroup = function (group) {
		// 	$ctrl.selectedGroup = group;
		// };

		// groupsStorage.query().then(function (groups) {			
		// 	$ctrl.groupsDeffered.resolve(groups);

		// 	$ctrl.groupsPromise.then(function (groups) {
		// 		$ctrl.groups = groups;
		// 		$ctrl.selectedGroup = $ctrl.groups[0];

		// 		//initialize services for article storing

		// 		return groups;
		// 	});
		// });	
	}
});

