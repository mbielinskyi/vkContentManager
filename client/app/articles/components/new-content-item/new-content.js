define([], function () {
	function NewContentComponent () {
		var $ctrl = this;

		$ctrl.collapsed = true;
		$ctrl.selectedDate = new Date();
		$ctrl.minDate = new Date();

		function getDefaultArticle () {
			return {
				text: "",
				status: 0,
				delay: 1000,
				scheduledPostDate: (new Date()).valueOf(),
				author: "Maksim Bielinskyi"
			};
		}

		$ctrl.article = getDefaultArticle();

		// TODO: this method should save article to server
		// using only articleContainer service
		$ctrl.save = function () {
			$ctrl.article.creationDate = (new Date()).valueOf();
			
			
			$ctrl.onSave({article: $ctrl.article});
			$ctrl.collapsed = !$ctrl.collapsed;

			$ctrl.article = getDefaultArticle();
		};

		$ctrl.toggleState = function () {
			$ctrl.collapsed = !$ctrl.collapsed;
		};

		$ctrl.updateDateAttributes = function (date) {
			$ctrl.article.delay = date - (new Date()).valueOf();
			$ctrl.article.scheduledPostDate = date;
		};
	}

	return {
		name: "newContent",
		config: {
			templateUrl: 'app/articles/components/new-content-item/new-content.html',
			bindings: {
				onSave: "&"
			},
			controller: NewContentComponent
		}
	};
});