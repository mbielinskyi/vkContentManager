define([], function () {
	function NewContentComponent () {
		var $ctrl = this;

		$ctrl.collapsed = true;

		$ctrl.article = {
			text: "",
			delay: 1000,
			scheduledPostDate: new Date(),
			author: "Maksim Bielinskyi"
		};

		$ctrl.save = function () {
			$ctrl.article.creationDate = (new Date()).valueOf();
			$ctrl.onSave({article: $ctrl.article});
			$ctrl.collapsed = !$ctrl.collapsed;
		};

		$ctrl.toggleState = function () {
			$ctrl.collapsed = !$ctrl.collapsed;
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