define([], function () {
	
	function OddFilter () {
		return function (array) {
			if (!array) return array;

			return array.filter(function (el, index) {
				return index %2 === 0;
			});
		};
	}

	return {
		name: "odd",
		fn: OddFilter
	};
});