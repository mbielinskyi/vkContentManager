define([], function () {
	function PostingQueueComponent () {
		var $ctrl = this;

	}

	return {
		name: "postingQueue",
		config: {
			templateUrl: 'app/groups/components/posting-queue/posting-queue.html',
			bindings: {
			},
			controller: PostingQueueComponent
		}
	};
});
