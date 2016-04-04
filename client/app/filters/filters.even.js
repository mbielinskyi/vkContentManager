define([], function () {

	function EvenFilter () {
		return function (array) {
			if (!array) return array;

			return array.filter(function (el, index) {
				return index % 2 !== 0;
			});
		};
	}

	return {
		name: "even",
		fn: EvenFilter
	};
});