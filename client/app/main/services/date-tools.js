define([], function () {
	return {
		name: "dateTools",
		fn: DateTools
	};

	function DateTools (msToTimeFilter, Constants) {
		var timeOffsetMin = (new Date()).getTimezoneOffset();
	    var timeOffsetMs = timeOffsetMin * Constants.MS_IN_MINUTE;

		function fixTimeArrayFormat (el, i) {
			var firstChar = el[0] && parseInt(el[0]);
			var secondChar = el[1] && parseInt(el[1]);

			// element index corresponds with 
			// pairs of numbers in time format
			// 0 - hours
			// 1 - minutes
			// 2 - seconds
			var validations = {
					0: checkFirstPair,
					1: checkRemainingPairs,
					2: checkRemainingPairs
				};

			// - when first sign is 0 or 1 - second should be 0 to 9
			// - when first sign is 2 - second should be 1,2,3
			// - when first sign is gt than 2
			// for hh
			function checkFirstPair (a, b) {
				if (a > 2) a = 2;
				if (a === 2 && b > 3) b = 3;

				return checkForNonDigits(a, b);
			}

			// - when 1st char is gt 5
			// for mm and ss
			function checkRemainingPairs (a, b) {
				if (a > 5) a = 5;
				return checkForNonDigits(a, b);
			}

			// - when first or second chars are not numbers 
			// for hh mm ss
			function checkForNonDigits (a, b) {
				a = (a === undefined)?"":(isNaN(a)?0:a);
				b = (b === undefined)?"":(isNaN(b)?0:b);

				return "" + a + b;
			}

			return validations[i](firstChar, secondChar);
		}

		// takes in String
		// returns Array with String.length / 2 elements
		function splitStringToPairsArray (string) {
			// check last el in array for length
			if (string && string.length > 2) {
				// split to two elements: [firstTwoChars, rest]
				var rest = string.slice(2, string.length);
				var firstTwoChars = string.slice(0,2);

				return [firstTwoChars, rest];
			} else {
				return [string];
			}
		}

		return {				
			getNow: function () {
				var newDate = new Date();
				var ms = newDate.valueOf() - timeOffsetMs;
				return {
					date: newDate,
					ms: ms,
					time: this.convertMsToTimeArray(ms),
					delay: 0
				};
			},
			getThen: function (_date_) {
				var date = (_date_ instanceof Date)?_date_:new Date(_date_ + timeOffsetMs),
					now = this.getNow(), 
					ms = date.valueOf() - timeOffsetMs, 
					delay = ms - now.ms;

				return {
					date: date,
					ms: ms,
					time: this.convertMsToTimeArray(ms),
					delay: delay < 0 ? 0 : delay
				};
			},
			getValidTimeArray: function (timeArray) {
				var lastAllowedPairIndex = 2;

				timeArray = timeArray.map(function (el, i, arr) {
				return (i < arr.length - 1)? el.slice(0,2): el;
				});


				// lets remove all chars from input field
				if (!timeArray) return;

				var lastElement = timeArray.pop();

				// if (lastElement.length <= 2) return timeArray;

				var pairs = splitStringToPairsArray(lastElement);

				timeArray = timeArray.concat(pairs);

				// reducing array to 3 elements
				timeArray = timeArray.slice(0, lastAllowedPairIndex + 1);

				// removing all unsupported chars
				timeArray = timeArray.map(fixTimeArrayFormat);

				return timeArray;
			}, 
			convertMsToTimeArray: function (ms) {
				var timeString = msToTimeFilter(ms);
				var timeStringShort = (timeString.length > 8)? timeString.substr(-8): timeString;
				return timeStringShort.split(":");
			},
			convertTimeArrayToMs: function (timeArray) {
				var ms = 0;
				var multipliers = {
						0: Constants.MS_IN_HOUR,
						1: Constants.MS_IN_MINUTE,
						2: Constants.MS_IN_SECOND
					};

				timeArray.forEach(function (el, i) {
					ms += el * multipliers[i];
				});

				return ms;
			},
			setTime: function (date, timeArray) {
				timeArray.forEach(function (el, i) {
					var dateModifications = {
							0: function (hours) {
								date.setHours(hours);
							},
							1: function (minutes) {
								date.setMinutes(minutes);
							},
							2: function (seconds) {
								date.setSeconds(seconds);
							}              
						};

					dateModifications[i](el);
				});

				return date;
			}
		};	
	}
});